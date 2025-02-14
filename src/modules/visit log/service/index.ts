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
export class VisitLogService {
  static logVisit = async (patientId: number, doctorId: number, visitDetails: string) => {
    try {
      const visitLog = await VisitLogRepository.logVisit(patientId, doctorId, visitDetails);
      if (!visitLog) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to log visit');
      }
      return visitLog;
    } catch (error) {
      _logger.error('[VisitLogService]::Error logging visit', error);
      throw error;
    }
  };

  static fetchVisitsByPatient = async (patientId: number) => {
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
}
