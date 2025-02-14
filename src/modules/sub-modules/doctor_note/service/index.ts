import { ResponseHandler } from '../../shared/helpers/response.handler';
import { Request, Response } from 'express';
import Logger from '../../config/logger';
import { UserService } from '../users/user/service';
import { StatusCodes } from 'http-status-codes';
import {  FetchMedicalHistoryByIdSchema, 
  FetchMedicalHistoryByPatientSchema, 
  CreateMedicalHistorySchema, 
  UpdateMedicalHistorySchema, 
  DeleteMedicalHistorySchema  } from './validation';
import { TotpHelper } from '../../shared/helpers/totpHelper';
import { AuthService } from './service';

const _logger = new Logger('Meidcal History');

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

  static createDoctorNote = async (request: CreateDoctorNoteSchema) => {
    try {
      const note = await DoctorNoteRepository.createDoctorNote(request);
      if (!note) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create doctor note');
      }
      return note;
    } catch (error) {
      _logger.error('[DoctorNoteService]::Error creating doctor note', error);
      throw error;
    }
  };

  static updateDoctorNote = async (id: number, request: UpdateDoctorNoteSchema) => {
    try {
      const updatedNote = await DoctorNoteRepository.updateDoctorNote(id, request);
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
}
