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


export class MedicalHistoryRepository {
  static async createMedicalHistory(patientId: number, diagnosis: string, treatment: string, notes: string, recordedBy: number) {
    try {
      const medicalHistory = await sqlQuest.one(medicalHistoryQueries.createMedicalHistory, [patientId, diagnosis, treatment, notes, recordedBy]);
      return medicalHistory;
    } catch (error) {
      _logger.error('[MedicalHistoryRepository]::Something went wrong when creating medical history', error);
      throw error;
    }
  }

  static async fetchMedicalHistoryById(historyId: number) {
    try {
      const medicalHistory = await sqlQuest.oneOrNone(medicalHistoryQueries.fetchMedicalHistoryById, [historyId]);
      return medicalHistory;
    } catch (error) {
      _logger.error('[MedicalHistoryRepository]::Something went wrong when fetching medical history by ID', error);
      throw error;
    }
  }

  static async fetchMedicalHistoryByPatientId(patientId: number) {
    try {
      const medicalHistories = await sqlQuest.manyOrNone(medicalHistoryQueries.fetchMedicalHistoryByPatientId, [patientId]);
      return medicalHistories;
    } catch (error) {
      _logger.error('[MedicalHistoryRepository]::Something went wrong when fetching medical history by patient ID', error);
      throw error;
    }
  }

  static async updateMedicalHistory(historyId: number, diagnosis: string | null, treatment: string | null, notes: string | null) {
    try {
      const updatedMedicalHistory = await sqlQuest.one(medicalHistoryQueries.updateMedicalHistory, [diagnosis, treatment, notes, historyId]);
      return updatedMedicalHistory;
    } catch (error) {
      _logger.error('[MedicalHistoryRepository]::Something went wrong when updating medical history', error);
      throw error;
    }
  }

  static async deleteMedicalHistory(historyId: number) {
    try {
      const deletedMedicalHistory = await sqlQuest.oneOrNone(medicalHistoryQueries.deleteMedicalHistory, [historyId]);
      return deletedMedicalHistory;
    } catch (error) {
      _logger.error('[MedicalHistoryRepository]::Something went wrong when deleting medical history', error);
      throw error;
    }
  }
}
