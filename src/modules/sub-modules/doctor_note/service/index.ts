import Logger from '../../../../config/logger';
import { StatusCodes } from 'http-status-codes';
import { ApiError } from '../../../../shared/utils/api.error';
import { DoctorNoteRepository } from '../repository';
import { CreateDoctorNoteValidator, UpdateDoctorNoteValidator } from '../validation';
import { scheduleReminders } from '../../reminders/middleware/schedule_task';
import { cancelExistingActionableSteps, extractActionableSteps, LLMResponse, Notes } from '../middleware';
import { ActionableStepsRepository } from '../../actionable_steps/repository';

const _logger = new Logger('Meidcal History');

interface ActionableStep {
  step_type: string;
  description: string;
  due_date?: string | null;
}

export class DoctorNoteService {
  static fetchDoctorNoteById = async (id: number) => {
    try {
      const note = await DoctorNoteRepository.fetchDoctorNoteById(id);
      if (!note) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Doctor note not found');
      }
      return note;
    } catch (error) {
      _logger.error('[DoctorNoteService]::Error fetching doctor note', error);
      throw error;
    }
  };

  static fetchDoctorNotesByPatient = async (patientId: number) => {
    try {
      const notes = await DoctorNoteRepository.fetchDoctorNotesByPatient(patientId);
      if (!notes || notes.length === 0) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'No doctor notes found for this patient');
      }
      return notes;
    } catch (error) {
      _logger.error('[DoctorNoteService]::Error fetching doctor notes by patient', error);
      throw error;
    }
  };

  static fetchAllDoctorNotes = async () => {
    try {
      const notes = await DoctorNoteRepository.fetchAllDoctorNotes();
      if (!notes || notes.length === 0) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'No doctor notes found');
      }
      return notes;
    } catch (error) {
      _logger.error('[DoctorNoteService]::Error fetching all doctor notes', error);
      throw error;
    }
  };

  // static createDoctorNote = async (request: CreateDoctorNoteValidator) => {
  //   try {
  //     const{ patient_id, doctor_id, note } = request
  //     const notee = await DoctorNoteRepository.createDoctorNote(patient_id, doctor_id, note);
  //     if (!notee) {
  //       throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create doctor note');
  //     }
  //     return note;
  //   } catch (error) {
  //     _logger.error('[DoctorNoteService]::Error creating doctor note', error);
  //     throw error;
  //   }
  // };

  static createDoctorNote = async (request: CreateDoctorNoteValidator) => {
    try {
      const { patient_id, doctor_id, note } = request;

      // 1. Encrypt the Note
      const { encryptedData, iv } = Notes.encrypt(note);

      // 2. Store Encrypted Note and IV in the Database
      const newNote = await DoctorNoteRepository.createDoctorNote(
        patient_id,
        doctor_id,
        encryptedData, // Store the encrypted data
        iv             // Store the IV
      );

      if (!newNote) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create doctor note');
      }

      //3.  Cancel Existing Actionable Steps (for this patient)
      await cancelExistingActionableSteps(patient_id);

      // 4. Decrypt the note for passing to LLM
      const decryptedText = Notes.decrypt(encryptedData, iv)
      // 5. Call the LLM to Extract Actionable Steps
      let actionableSteps: ActionableStep[] = []; // Declare outside the try block
      try{
        const llmApiKey = process.env.LLM_API_KEY;
        if (!llmApiKey) {
          _logger.error('[DoctorNoteService]::LLM_API_KEY environment variable is not set');
          throw new Error('LLM_API_KEY environment variable is not set');
        }
        const llmResponse = await extractActionableSteps(decryptedText, llmApiKey);

           // Validate the LLM response structure
        if (!llmResponse || !llmResponse.checklist || !llmResponse.plan) {
          _logger.error('[DoctorNoteService]::Invalid LLM response structure');
          throw new ApiError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            'Invalid LLM response: Missing checklist or plan'
          );
        }

         // Now we know that llmResponse is a valid LLMResponse type

        // combine the two arrays together

        actionableSteps = [
          ...llmResponse.checklist.map(item => ({
            step_type: 'checklist',
            description: item.description,
          })),
          ...llmResponse.plan.map(item => ({
            step_type: 'plan',
            description: item.description,
            due_date: item.due_date,
          })),

        ];

      }catch(llmError){
          _logger.error('[DoctorNoteService]::Error extracting actionable steps from LLM', llmError);
          // Decide how to handle the LLM failure. Here are a few options:
          // Option 1: Throw an error (fail the whole operation) - Best for critical systems
          // throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to extract actionable steps from LLM');

          // Option 2: Log the error and continue with an empty list of actionable steps - Best if LLM failure isnt critical and can function without.
          actionableSteps = []; // Treat it as if no actionable steps were found
      }


      // 6. **Check for Empty Actionable Steps and Handle it**
      if (!actionableSteps) {
      // if (!actionableSteps || actionableSteps.length === 0) {
        _logger.error('[DoctorNoteService]::No actionable steps extracted from LLM');
        // Depending on your requirements, you can:
        // - Log a warning and continue (as shown here) - LLM Fails but process continues
        // - Throw an error to indicate that the LLM processing failed- LLM Fails process fails.

        // If you want to throw an error:
        // throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'No actionable steps extracted from LLM');
        // if (!actionableSteps || actionableSteps.length === 0) {
        //     // Log a warning
        //     _logger.warn('[DoctorNoteService]::No actionable steps extracted from LLM');

        //     // Optionally, send a special "no actionable steps" notification to the doctor.
        //     // sendNoActionableStepsNotification(doctor_id, patient_id);

        //     // Since no actionable steps were found, skip the remaining steps.
        //     return note_text; // Or return a success message indicating that the note was created but no actions were found.
        //   }
      }

      // 7. Store Actionable Steps in the Database
      // Assuming you have a function in your repository to create actionable steps
       const actionStepPromises = actionableSteps.map(async (step) => {
        const dueDate = step.due_date ? new Date(step.due_date) : null;
        if (dueDate !== null) {
          await ActionableStepsRepository.createActionableStep(
            patient_id,
            newNote.id,
            step.step_type,
            step.description,
            dueDate,
            "pending"
          );
        } else {
          // Handle the case where dueDate is null
          // You can either skip creating the actionable step or use a default due date
        }
       });

       await Promise.all(actionStepPromises);

      // 8. Schedule Reminders (for "plan" items)

      const llmResponse: LLMResponse = {
        checklist: actionableSteps.filter(step => step.step_type === 'checklist'),
        plan: actionableSteps.filter(step => step.step_type === 'plan' && step.due_date !== undefined).map(step => ({
          description: step.description,
          due_date: step.due_date ?? null, // Add a null check and replace undefined with null
        })),
      };
      
      await scheduleReminders(llmResponse);

      // Return the original unencrypted text for purposes outside of back end
      return note;
    } catch (error) {
      _logger.error('[DoctorNoteService]::Error creating doctor note', error);
      throw error;
    }
  };

  static updateDoctorNote = async (id: number, request: UpdateDoctorNoteValidator) => {
    try {
      const { note } = request

      let updatedNote
      if (note) {
        updatedNote = await DoctorNoteRepository.updateDoctorNote(id, note);
      }
      if (!updatedNote) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Doctor note not found or could not be updated');
      }
      return updatedNote;
    } catch (error) {
      _logger.error('[DoctorNoteService]::Error updating doctor note', error);
      throw error;
    }
  };

  static softDeleteDoctorNote = async (id: number) => {
    try {
      const deletedNote = await DoctorNoteRepository.softDeleteDoctorNote(id);
      if (!deletedNote) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Doctor note not found or could not be deleted');
      }
      return deletedNote;
    } catch (error) {
      _logger.error('[DoctorNoteService]::Error soft deleting doctor note', error);
      throw error;
    }
  };

  static restoreDoctorNote = async (id: number) => {
    try {
      const restoredNote = await DoctorNoteRepository.restoreDoctorNote(id);
      if (!restoredNote) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Doctor note not found or could not be restored');
      }
      return restoredNote;
    } catch (error) {
      _logger.error('[DoctorNoteService]::Error restoring doctor note', error);
      throw error;
    }
  };

  static fetchDeletedDoctorNotes = async () => {
    try {
      const deletedNotes = await DoctorNoteRepository.fetchDeletedDoctorNotes();
      if (!deletedNotes || deletedNotes.length === 0) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'No deleted doctor notes found');
      }
      return deletedNotes;
    } catch (error) {
      _logger.error('[DoctorNoteService]::Error fetching deleted doctor notes', error);
      throw error;
    }
  };

  static fetchDeletedDoctorNotesByPatient = async (patientId: string) => {
    try {
      const deletedNotes = await DoctorNoteRepository.fetchDeletedDoctorNotesByPatient(patientId);
      if (!deletedNotes || deletedNotes.length === 0) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'No deleted doctor notes found for this patient');
      }
      return deletedNotes;
    } catch (error) {
      _logger.error('[DoctorNoteService]::Error fetching deleted doctor notes by patient', error);
      throw error;
    }
  };
}
