import { ApiError } from 'src/shared/utils/api.error';
import Logger from '../../../config/logger';

import { StatusCodes } from 'http-status-codes';
import { VisitLogRepository } from '../repository';

const _logger = new Logger('VisitLogService');
export class VisitLogService {
  static createVisitLog = async (req: any) => {
    const { patientId, doctorId, visitDetails } = req.body;
    try {
      const visitLog = await VisitLogRepository.createVisitLog(patientId, doctorId, visitDetails);
      if (!visitLog) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to log visit');
      }
      return visitLog;
    } catch (error) {
      _logger.error('[VisitLogService]::Error logging visit', error);
      throw error;
    }
  };

  static fetchVisitsByPatient = async (patientId: string) => {
    try {
      const visits = await VisitLogRepository.fetchVisitsByPatient(patientId);
      if (!visits || visits.length === 0) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'No visit records found for this patient');
      }
      return visits;
    } catch (error) {
      _logger.error('[VisitLogService]::Error fetching visits by patient', error);
      throw error;
    }
  };

  static fetchVisitsByDoctor = async (doctorId: number) => {
    try {
      const visits = await VisitLogRepository.fetchVisitsByDoctor(doctorId);
      if (!visits || visits.length === 0) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'No visit records found for this doctor');
      }
      return visits;
    } catch (error) {
      _logger.error('[VisitLogService]::Error fetching visits by doctor', error);
      throw error;
    }
  };

  static fetchVisitLog = async (visitId: number) => {
    try {
      const visit = await VisitLogRepository.fetchVisitLog(visitId);
      if (!visit) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Visit not found');
      }
      return visit;
    } catch (error) {
      _logger.error('[VisitLogService]::Error fetching visit log', error);
      throw error;
    }
  };

  static updateVisitLog = async (visitId: number, payload: any) => {
    const {doctor_id, patient_id} = payload
    try {
      const visit = await VisitLogRepository.updateVisitLog(visitId, patient_id, doctor_id);
      if (!visit) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Visit not found');
      }
      return visit;
    } catch (error) {
      _logger.error('[VisitLogService]::Error updating visit log', error);
      throw error;
    }
  };  

  static deleteVisitLog = async (visitId: number) => {
    try {
      const visit = await VisitLogRepository.deleteVisit(visitId);
      if (!visit) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Visit not found');
      }
      return visit;
    } catch (error) {
      _logger.error('[VisitLogService]::Error deleting visit log', error);
      throw error;
    }
  };
}
