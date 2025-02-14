import { sqlQuest } from '../../../config/database';
import { visitLogQueries } from '../queries';
import Logger from '../../../config/logger';


const _logger = new Logger('VIsitLogRepository');



export class VisitLogRepository {
  /**
   * Logs a visit of a patient by a doctor
   *
   * @param {number} patientId - The ID of the patient
   * @param {number} doctorId - The ID of the doctor
   * @param {Date} visitDate - The date and time of the visit
   *
   * @returns {Promise<VisitLog>} The created visit log entry
   */


  static async createVisitLog(patientId: number, doctorId: number, visitDate: Date) {
    try {
      const visit = await sqlQuest.one(visitLogQueries.createVisitLog, [patientId, doctorId, visitDate]);
      return visit;
    } catch (error) {
      _logger.error('[VisitLogRepository]::Something went wrong when logging visit', error);
      throw error;
    }
  }

  static async fetchVisitsByPatient(patientId: string) {
    try {
      const visits = await sqlQuest.manyOrNone(visitLogQueries.fetchVisitLogsByPatient, [patientId]);
      return visits;
    } catch (error) {
      _logger.error('[VisitLogRepository]::Something went wrong when fetching visits by patient', error);
      throw error;
    }
  }

  static async fetchVisitLog(visitId: number) {
    try {
      const visit = await sqlQuest.oneOrNone(visitLogQueries.fetchVisitLog, [visitId]);
      return visit;
    } catch (error) {
      _logger.error('[VisitLogRepository]::Something went wrong when fetching visit', error);
      throw error;
    }
  }

  static async updateVisitLog(visit_id: number, patient_id: number, doctor_id: number,) {
    try {
      const visit = await sqlQuest.oneOrNone(visitLogQueries.updateVisitLog, [visit_id, patient_id, doctor_id]);
      return visit;
    } catch (error) {
      _logger.error('[VisitLogRepository]::Something went wrong when updating visit', error);
      throw error;
    }
  }

  static async fetchVisitsByDoctor(doctorId: number) {
    try {
      const visits = await sqlQuest.manyOrNone(visitLogQueries.fetchVisitLogsByDoctor, [doctorId]);
      return visits;
    } catch (error) {
      _logger.error('[VisitLogRepository]::Something went wrong when fetching visits by doctor', error);
      throw error;
    }
  }

  static async deleteVisit(visit_id: number) {
    try {
      const deletedVisit = await sqlQuest.oneOrNone(visitLogQueries.deleteVisitLog, [visit_id]);
      return deletedVisit;
    } catch (error) {
      _logger.error('[VisitLogRepository]::Something went wrong when deleting visit', error);
      throw error;
    }
  }
}