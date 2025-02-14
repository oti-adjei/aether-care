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

export class MedicalHistoryService {
  static fetchMedicalHistory = async (id: number) => {
    try {
      const history = await MedicalHistoryRepository.fetchMedicalHistory(id);
      if (!history) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Medical history not found');
      }
      return history;
    } catch (error) {
      _logger.error('[MedicalHistoryService]::Error fetching medical history', error);
      throw error;
    }
  };

  static fetchMedicalHistoryByPatient = async (patientId: number) => {
    try {
      const histories = await MedicalHistoryRepository.fetchMedicalHistoryByPatient(patientId);
      if (!histories) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'No medical history found for this patient');
      }
      return histories;
    } catch (error) {
      _logger.error('[MedicalHistoryService]::Error fetching medical history by patient', error);
      throw error;
    }
  };

  static createMedicalHistory = async (request: CreateMedicalHistorySchema) => {
    try {
      const history = await MedicalHistoryRepository.createMedicalHistory(request);
      if (!history) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Unable to create medical history');
      }
      return history;
    } catch (error) {
      _logger.error('[MedicalHistoryService]::Error creating medical history', error);
      throw error;
    }
  };

  static updateMedicalHistory = async (id: number, request: UpdateMedicalHistorySchema) => {
    try {
      const history = await MedicalHistoryRepository.updateMedicalHistory(id, request);
      if (!history) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Medical history not found');
      }
      return history;
    } catch (error) {
      _logger.error('[MedicalHistoryService]::Error updating medical history', error);
      throw error;
    }
  };

  static deleteMedicalHistory = async (id: number) => {
    try {
      const history = await MedicalHistoryRepository.deleteMedicalHistory(id);
      if (!history) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Medical history not found');
      }
      return history;
    } catch (error) {
      _logger.error('[MedicalHistoryService]::Error deleting medical history', error);
      throw error;
    }
  };
}
