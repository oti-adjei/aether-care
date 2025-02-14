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
import { sqlQuest } from '../database/sqlQuest';
import { _logger } from '../utils/logger';
import { visitLogQueries } from '../queries/visitLogQueries';

export class VisitLogRepository {
  static async logVisit(patientId: number, doctorId: number, visitDate: Date, notes: string) {
    try {
      const visit = await sqlQuest.one(visitLogQueries.logVisit, [patientId, doctorId, visitDate, notes]);
      return visit;
    } catch (error) {
      _logger.error('[VisitLogRepository]::Something went wrong when logging visit', error);
      throw error;
    }
  }

  static async fetchVisitsByPatient(patientId: number) {
    try {
      const visits = await sqlQuest.manyOrNone(visitLogQueries.fetchVisitsByPatient, [patientId]);
      return visits;
    } catch (error) {
      _logger.error('[VisitLogRepository]::Something went wrong when fetching visits by patient', error);
      throw error;
    }
  }

  static async fetchVisitsByDoctor(doctorId: number) {
    try {
      const visits = await sqlQuest.manyOrNone(visitLogQueries.fetchVisitsByDoctor, [doctorId]);
      return visits;
    } catch (error) {
      _logger.error('[VisitLogRepository]::Something went wrong when fetching visits by doctor', error);
      throw error;
    }
  }

  static async deleteVisit(visitId: number) {
    try {
      const deletedVisit = await sqlQuest.oneOrNone(visitLogQueries.deleteVisit, [visitId]);
      return deletedVisit;
    } catch (error) {
      _logger.error('[VisitLogRepository]::Something went wrong when deleting visit', error);
      throw error;
    }
  }
}