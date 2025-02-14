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
import { patientDoctorAssignmentQueries } from '../queries/patientDoctorAssignmentQueries';

export class PatientDoctorAssignmentRepository {
  static async assignDoctorToPatient(patientId: number, doctorId: number) {
    try {
      const assignment = await sqlQuest.one(patientDoctorAssignmentQueries.assignDoctorToPatient, [patientId, doctorId]);
      return assignment;
    } catch (error) {
      _logger.error('[PatientDoctorAssignmentRepository]::Something went wrong when assigning doctor to patient', error);
      throw error;
    }
  }

  static async fetchAssignmentsByPatient(patientId: number) {
    try {
      const assignments = await sqlQuest.manyOrNone(patientDoctorAssignmentQueries.fetchAssignmentsByPatient, [patientId]);
      return assignments;
    } catch (error) {
      _logger.error('[PatientDoctorAssignmentRepository]::Something went wrong when fetching assignments by patient', error);
      throw error;
    }
  }

  static async fetchAssignmentsByDoctor(doctorId: number) {
    try {
      const assignments = await sqlQuest.manyOrNone(patientDoctorAssignmentQueries.fetchAssignmentsByDoctor, [doctorId]);
      return assignments;
    } catch (error) {
      _logger.error('[PatientDoctorAssignmentRepository]::Something went wrong when fetching assignments by doctor', error);
      throw error;
    }
  }

  static async unassignDoctorFromPatient(patientId: number, doctorId: number) {
    try {
      const unassignment = await sqlQuest.oneOrNone(patientDoctorAssignmentQueries.unassignDoctorFromPatient, [patientId, doctorId]);
      return unassignment;
    } catch (error) {
      _logger.error('[PatientDoctorAssignmentRepository]::Something went wrong when unassigning doctor from patient', error);
      throw error;
    }
  }
}
