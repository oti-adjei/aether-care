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
  static fetchDoctor = async (user_id: string) => {
    try {
      const doctor = await DoctorRepository.fetchDoctor(user_id);
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
      const { first_name,surname,email,specialty,password,experience,license_number } = request;
      const existingDoctor = await DoctorRepository.checkIfDoctorExists(email);

      if (existingDoctor) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Doctor already exists');
      }

      //create User first
      const user = await UserRepository.createUser(first_name,surname, email, password, 'doctor');

      //create doctor
      const doctor = await DoctorRepository.createDoctor(user.user_id, specialty,experience,license_number);
      if (!doctor) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Unable to create doctor');
      }
      return doctor;
    } catch (error) {
      _logger.error('[DoctorService]::Error creating doctor', error);
      throw error;
    }
  };

/*  test this see if it works
static createDoctor = async (request: CreateDoctorValidator) => {
  const client = await sqlQuest.getConnection(); // Get transaction client

  try {
    return await client.tx(async (transaction) => {
      const { first_name, surname, email, specialty, password, experience, license_number } = request;

      // Step 1: Check if the doctor already exists
      const existingDoctor = await transaction.oneOrNone(DoctorQueries.checkIfDoctorExists, [email]);
      if (existingDoctor) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Doctor already exists');
      }

      // Step 2: Create User first
      const user = await transaction.one(UserQueries.createUser, [
        first_name, surname, email, password, 'doctor'
      ]);

      // Step 3: Create Doctor record
      const doctor = await transaction.one(DoctorQueries.createDoctor, [
        user.user_id, specialty, experience, license_number
      ]);

      return doctor; // Return doctor details on success
    });

  } catch (error) {
    _logger.error('[DoctorService]::Transaction failed', error);
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Doctor creation failed');
  } finally {
    client.release();
  }
};*/


  static updateDoctor = async (user_id: string, request: UpdateDoctorValidator) => {
    try {
      const { first_name,surname, email, specialty,experience,license_number,password } = request;

      let existingDoctor
      if (email) {
       existingDoctor = await DoctorRepository.checkIfDoctorExists(email);
      }
      else{
        existingDoctor = await DoctorRepository.fetchDoctor(user_id);
      }
      if (!existingDoctor) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Doctor not found');
      }

      //update User side first
      const user = await UserRepository.updateUser(user_id, first_name,surname, email, password);
      const doctor = await DoctorRepository.updateDoctor(user.user_id, experience, specialty, license_number);
      if (!doctor) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Doctor not found');
      }
      return doctor;
    } catch (error) {
      _logger.error('[DoctorService]::Error updating doctor', error);
      throw error;
    }
  };

  static deleteDoctor = async (user_id: string) => {
    try {
      const user = await UserRepository.deleteUser(user_id);
      if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
      }
      const doctor = await DoctorRepository.deleteDoctor(user_id);
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

