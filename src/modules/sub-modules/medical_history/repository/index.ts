import { sqlQuest } from '../../../../config/database';
import { medicalHistoryQueries } from '../queries';
import Logger from '../../../../config/logger';


const _logger = new Logger('Meidcal History');


export class MedicalHistoryRepository {
  static async createMedicalHistory(request: any) {
    const { patientId, diagnosis, treatment, notes, recordedBy } = request;
    try {
      const medicalHistory = await sqlQuest.one(medicalHistoryQueries.createMedicalHistory, [patientId, diagnosis, treatment, notes, recordedBy]);
      return medicalHistory;
    } catch (error) {
      _logger.error('[MedicalHistoryRepository]::Something went wrong when creating medical history', error);
      throw error;
    }
  }

  static async fetchMedicalHistoryById(historyId: string) {
    try {
      const medicalHistory = await sqlQuest.oneOrNone(medicalHistoryQueries.fetchMedicalHistory, [historyId]);
      return medicalHistory;
    } catch (error) {
      _logger.error('[MedicalHistoryRepository]::Something went wrong when fetching medical history by ID', error);
      throw error;
    }
  }

  static async fetchMedicalHistoryByPatientId(patientId: string) {
    try {
      const medicalHistories = await sqlQuest.manyOrNone(medicalHistoryQueries.fetchMedicalHistoryByPatientId, [patientId]);
      return medicalHistories;
    } catch (error) {
      _logger.error('[MedicalHistoryRepository]::Something went wrong when fetching medical history by patient ID', error);
      throw error;
    }
  }

  static async fetchAllMedicalHistories() {
    try {
      const medicalHistories = await sqlQuest.manyOrNone(medicalHistoryQueries.fetchAllMedicalHistories);
      return medicalHistories;
    } catch (error) {
      _logger.error('[MedicalHistoryRepository]::Something went wrong when fetching all medical histories', error);
      throw error;
    }
  }

  static async updateMedicalHistory(id: string, request: any) {
    const { historyId, diagnosis, treatment, notes } = request;
    try {
      const updatedMedicalHistory = await sqlQuest.one(medicalHistoryQueries.updateMedicalHistory, [id,diagnosis, treatment, notes, historyId]);
      return updatedMedicalHistory;
    } catch (error) {
      _logger.error('[MedicalHistoryRepository]::Something went wrong when updating medical history', error);
      throw error;
    }
  }

  static async deleteMedicalHistory(historyId: string) {
    try {
      const deletedMedicalHistory = await sqlQuest.oneOrNone(medicalHistoryQueries.deleteMedicalHistory, [historyId]);
      return deletedMedicalHistory;
    } catch (error) {
      _logger.error('[MedicalHistoryRepository]::Something went wrong when deleting medical history', error);
      throw error;
    }
  }
}
