import { ApiError } from '../../../../shared/utils/api.error';
import Logger from '../../../../config/logger';
import { DoctorRepository } from '../repository';
import { StatusCodes } from 'http-status-codes';
import { CreateDoctorValidator, UpdateDoctorValidator } from '../validation';
import { UserRepository } from '../../user/repository';
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
export class DoctorService {
  static fetchDoctor = async (id: string) => {
    try {
      const doctor = await DoctorRepository.fetchDoctor(id);
      if (!doctor) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Doctor not found');
      }
      return doctor;
    } catch (error) {
      _logger.error('[DoctorService]::Error fetching doctor', error);
      throw error;
    }
  };

  static fetchDoctorByEmail = async (email: string) => {
    try {
      const doctor = await DoctorRepository.fetchDoctorByEmail(email);
      if (!doctor) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Doctor not found');
      }
      return doctor;
    } catch (error) {
      _logger.error('[DoctorService]::Error fetching doctor by email', error);
      throw error;
    }
  };

  static fetchAllDoctors = async () => {
    try {
      const doctors = await DoctorRepository.fetchAllDoctors();
      if (!doctors) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Doctors not found');
      }
      return doctors;
    } catch (error) {
      _logger.error('[DoctorService]::Error fetching all doctors', error);
      throw error;
    }
  };

  static createDoctor = async (request: CreateDoctorValidator) => {
    try {
      const { firstName,surname,email,phone,specialization,password,experience,license_number } = request;
      const existingDoctor = await DoctorRepository.checkIfDoctorExists(email);

      if (existingDoctor) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Doctor already exists');
      }

      //create User first
      const user = await UserRepository.createUser(firstName,surname, email, password, 'doctor');

      //create doctor
      const doctor = await DoctorRepository.createDoctor(user.user_id,experience,specialization,license_number);
      if (!doctor) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Unable to create doctor');
      }
      return doctor;
    } catch (error) {
      _logger.error('[DoctorService]::Error creating doctor', error);
      throw error;
    }
  };

  static updateDoctor = async (id: number, request: UpdateDoctorValidator) => {
    try {
      const { firstName,surname, email,phone, specialization,experience,license_number,password } = request;

      let existingDoctor
      if (email) {
       existingDoctor = await DoctorRepository.checkIfDoctorExists(email);
      }
      if (!existingDoctor) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Doctor not found');
      }

      //update User side first
      const user = await UserRepository.updateUser(id, firstName,surname, email, password);
      const doctor = await DoctorRepository.updateDoctor(user.user_id, experience, specialization, license_number);
      if (!doctor) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Doctor not found');
      }
      return doctor;
    } catch (error) {
      _logger.error('[DoctorService]::Error updating doctor', error);
      throw error;
    }
  };

  static deleteDoctor = async (id: string) => {
    try {
      const doctor = await DoctorRepository.deleteDoctor(id);
      if (!doctor) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Doctor not found');
      }
      return doctor;
    } catch (error) {
      _logger.error('[DoctorService]::Error deleting doctor', error);
      throw error;
    }
  };
}

