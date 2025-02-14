
import Logger from '../../../../config/logger';
import { StatusCodes } from 'http-status-codes';
import { ApiError } from 'src/shared/utils/api.error';
import { MedicalHistoryRepository } from '../repository';
import { CreateMedicalHistoryValidator, UpdateMedicalHistoryValidator } from '../validation';


const _logger = new Logger('Meidcal History');

export class MedicalHistoryService {
  static fetchMedicalHistory = async (id: string) => {
    try {
      const history = await MedicalHistoryRepository.fetchMedicalHistoryById(id);
      if (!history) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Medical history not found');
      }
      return history;
    } catch (error) {
      _logger.error('[MedicalHistoryService]::Error fetching medical history', error);
      throw error;
    }
  };

  static fetchMedicalHistoryByPatient = async (patientId: string) => {
    try {
      const histories = await MedicalHistoryRepository.fetchMedicalHistoryByPatientId(patientId);
      if (!histories) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'No medical history found for this patient');
      }
      return histories;
    } catch (error) {
      _logger.error('[MedicalHistoryService]::Error fetching medical history by patient', error);
      throw error;
    }
  };

  static fetchAllMedicalHistories = async () => {
    try {
      const histories = await MedicalHistoryRepository.fetchAllMedicalHistories();
      if (!histories) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'No medical history found');
      }
      return histories;
    } catch (error) {
      _logger.error('[MedicalHistoryService]::Error fetching all medical history', error);
      throw error;
    }
  };

  static createMedicalHistory = async (request: CreateMedicalHistoryValidator) => {
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

  static updateMedicalHistory = async (id: string, request: UpdateMedicalHistoryValidator) => {
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

  static deleteMedicalHistory = async (id: string) => {
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
