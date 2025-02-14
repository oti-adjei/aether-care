
import { sqlQuest } from '../../../../config/database';
import { actionableStepsQueries } from '../queries';
import Logger from '../../../../config/logger';


const _logger = new Logger('Meidcal History');


export class ActionableStepsRepository {
  static async createActionableStep(patientId: number, step: string, dueDate: Date) {
    try {
      const actionableStep = await sqlQuest.one(actionableStepsQueries.createActionableStep, [patientId, step, dueDate]);
      return actionableStep;
    } catch (error) {
      _logger.error('[ActionableStepsRepository]::Something went wrong when creating actionable step', error);
      throw error;
    }
  }

  static async fetchActionableSteps(patientId: number) {
    try {
      const steps = await sqlQuest.manyOrNone(actionableStepsQueries.fetchActionableStep, [patientId]);
      return steps;
    } catch (error) {
      _logger.error('[ActionableStepsRepository]::Something went wrong when fetching actionable steps', error);
      throw error;
    }
  }

  static async fetchActionableStepsByPatient(stepId: number) {
    try {
      const step = await sqlQuest.oneOrNone(actionableStepsQueries.fetchActionableStepsByPatient, [stepId]);
      return step;
    } catch (error) {
      
    }
  }

  static async fetchActionableStepsByDoctor(doctorId: number) {
    try {
      const steps = await sqlQuest.manyOrNone(actionableStepsQueries.fetchActionableStepsByDoctor, [doctorId]);
      return steps;
    } catch (error) {
      _logger.error('[ActionableStepsRepository]::Something went wrong when fetching actionable steps by doctor', error);
      throw error;
    }
  }

  static fetchAllActionableSteps() {
    try {
      return sqlQuest.manyOrNone(actionableStepsQueries.fetchAllActionableSteps);
    } catch (error) {
      _logger.error('[ActionableStepsRepository]::Something went wrong when fetching all actionable steps', error);
      throw error;
    }
  }

  static async updateActionableStep(stepId: number, step: string, dueDate: Date) {
    try {
      const updatedStep = await sqlQuest.oneOrNone(actionableStepsQueries.updateActionableStep, [stepId, step, dueDate]);
      return updatedStep;
    } catch (error) {
      _logger.error('[ActionableStepsRepository]::Something went wrong when updating actionable step', error);
      throw error;
    }
  }

  static async deleteActionableStep(stepId: number) {
    try {
      const deletedStep = await sqlQuest.oneOrNone(actionableStepsQueries.deleteActionableStep, [stepId]);
      return deletedStep;
    } catch (error) {
      _logger.error('[ActionableStepsRepository]::Something went wrong when deleting actionable step', error);
      throw error;
    }
  }

  static async  cancelActionableStepsByPatientId(patientId: string): Promise<void> {
    try {
      // await actionableStepRepository
      //   .createQueryBuilder()
      //   .update(ActionableStep)
      //   .set({ is_cancelled: true })
      //   .where('patient_id = :patientId', { patientId })
      //   .execute();

      const cancel = await sqlQuest.oneOrNone(actionableStepsQueries.cancelActionableStepsByPatientId, [patientId]);

      if (!cancel) {
        _logger.log(`No actionable steps found for patient ${patientId}`);
        return;
      }

      return cancel;

      _logger.log(`Successfully cancelled existing actionable steps for patient ${patientId}`);
    } catch (error) {
      _logger.error('Error canceling actionable steps:', error);
      throw error; // Re-throw the error for handling upstream
    }
  }
}

