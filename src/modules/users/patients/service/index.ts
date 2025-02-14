import { ApiError } from '../../../../shared/utils/api.error';
import Logger from '../../../../config/logger';
import { PatientRepository, UserRepository } from '../repository';
import { StatusCodes } from 'http-status-codes';
import { CreatePatientValidator, UpdatePatientValidator } from '../validation';
// import {
//   sanitizeInput,
//   NullableString,

// } from '../../../../shared/helpers/sanitize.input';
// import {
//   ConsumerUserType,
//   CreateUserSchema,
//   LoginValidator,
//   SendPhoneNumberOtpValidator,
//   VerifyPhoneNumberOtpValidator,
// } from '../validation/index';
// import { GenericHelper } from '../../../../shared/helpers/generic.helper';
// import Env from '../../../../shared/utils/env';
// import * as jwt from 'jsonwebtoken';
// import logger from '../../../../config/logger';

const _logger = new Logger('UserService');

export class PatientService {
  static fetchPatient = async (id: string) => {
    try {
      const patient = await PatientRepository.fetchPatientById(id);
      if (!patient) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Patient not found');
      }
      return patient;
    } catch (error) {
      _logger.error('[PatientService]::Error fetching patient', error);
      throw error;
    }
  };

  static fetchPatientByEmail = async (email: string) => {
    try {
      const patient = await PatientRepository.fetchPatientByEmail(email);
      if (!patient) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Patient not found');
      }
      return patient;
    } catch (error) {
      _logger.error('[PatientService]::Error fetching patient by email', error);
      throw error;
    }
  };

  static fetchAllPatients = async () => {
    try {
      const patients = await PatientRepository.fetchAllPatients();
      if (!patients) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'No patients found');
      }
      return patients;
    } catch (error) {
      _logger.error('[PatientService]::Error fetching all patients', error);
      throw error;
    }
  };

  static createPatient = async (request: CreatePatientValidator) => {
    try {
      const existingPatient = await PatientRepository.fetchPatientByEmail(request.email);
      if (existingPatient) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Patient with email already exists');
      }
      const patient = await PatientRepository.createPatient(request);
      if (!patient) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Unable to create patient');
      }
      return patient;
    } catch (error) {
      _logger.error('[PatientService]::Error creating patient', error);
      throw error;
    }
  };

  static updatePatient = async (id: number, request: UpdatePatientValidator) => {
    try {
      const patient = await PatientRepository.updatePatient(id, request);
      if (!patient) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Patient not found');
      }
      return patient;
    } catch (error) {
      _logger.error('[PatientService]::Error updating patient', error);
      throw error;
    }
  };

  static deletePatient = async (id: number) => {
    try {
      const patient = await PatientRepository.deletePatient(id);
      if (!patient) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Patient not found');
      }
      return patient;
    } catch (error) {
      _logger.error('[PatientService]::Error deleting patient', error);
      throw error;
    }
  };
}

