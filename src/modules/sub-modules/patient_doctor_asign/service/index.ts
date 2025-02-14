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

export class PatientDoctorAssignmentService {
  static assignDoctorToPatient = async (patientId: number, doctorId: number) => {
    try {
      const assignment = await PatientDoctorAssignmentRepository.assignDoctorToPatient(patientId, doctorId);
      if (!assignment) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to assign doctor to patient');
      }
      return assignment;
    } catch (error) {
      _logger.error('[PatientDoctorAssignmentService]::Error assigning doctor to patient', error);
      throw error;
    }
  };

  static fetchDoctorsByPatient = async (patientId: number) => {
    try {
      const doctors = await PatientDoctorAssignmentRepository.fetchDoctorsByPatient(patientId);
      if (!doctors || doctors.length === 0) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'No doctors found for this patient');
      }
      return doctors;
    } catch (error) {
      _logger.error('[PatientDoctorAssignmentService]::Error fetching doctors by patient', error);
      throw error;
    }
  };

  static fetchPatientsByDoctor = async (doctorId: number) => {
    try {
      const patients = await PatientDoctorAssignmentRepository.fetchPatientsByDoctor(doctorId);
      if (!patients || patients.length === 0) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'No patients found for this doctor');
      }
      return patients;
    } catch (error) {
      _logger.error('[PatientDoctorAssignmentService]::Error fetching patients by doctor', error);
      throw error;
    }
  };

  static unassignDoctorFromPatient = async (patientId: number, doctorId: number) => {
    try {
      const unassigned = await PatientDoctorAssignmentRepository.unassignDoctorFromPatient(patientId, doctorId);
      if (!unassigned) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Doctor-patient assignment not found or could not be removed');
      }
      return unassigned;
    } catch (error) {
      _logger.error('[PatientDoctorAssignmentService]::Error unassigning doctor from patient', error);
      throw error;
    }
  };
}
