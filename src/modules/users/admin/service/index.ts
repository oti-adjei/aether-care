import { ApiError } from '../../../../shared/utils/api.error';
import Logger from '../../../../config/logger';
import { AdminRepository } from '../repository';
import { StatusCodes } from 'http-status-codes';
import { CreateAdminValidator, UpdateAdminValidator, } from '../validation';
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

const _logger = new Logger('UserService');


export class AdminService {
  static fetchAdmin = async (id: string) => {
    try {
      const admin = await AdminRepository.fetchAdmin(id);
      if (!admin) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Admin not found');
      }
      return admin;
    } catch (error) {
      _logger.error('[AdminService]::Error fetching admin', error);
      throw error;
    }
  };

  static fetchAdminByEmail = async (email: string) => {
    try {
      const admin = await AdminRepository.fetchAdminByEmail(email);
      if (!admin) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Admin not found');
      }
      return admin;
    } catch (error) {
      _logger.error('[AdminService]::Error fetching admin by email', error);
      throw error;
    }
  };

  static fetchAllAdmins = async () => {
    try {
      const admins = await AdminRepository.fetchAllAdmins();
      if (!admins) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Admins not found');
      }
      return admins;
    } catch (error) {
      _logger.error('[AdminService]::Error fetching all admins', error);
      throw error;
    }
  };

  static createAdmin = async (request: CreateAdminValidator) => {
    try {
      const {
        firstName,
        surname,
        email,
        phone,
        password,
      } = request;
      const existingAdmin = await AdminRepository.fetchAdminByEmail(request.email);
      if (existingAdmin) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Admin with email already exists');
      }
      const user = await UserRepository.createUser(firstName,surname, email,phone, password);
      
      if (!user) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Unable to create admin');
      }
      const admin = await AdminRepository.createAdmin(firstName, surname, email, phone, password);
      return admin;
    } catch (error) {
      _logger.error('[AdminService]::Error creating admin', error);
      throw error;
    }
  };

  static updateAdmin = async (id: number, request: UpdateAdminValidator) => {
    try {
      const {
        firstName,
        surname,
        email,
        phone,
        password,
      } = request;

      const admin = await UserRepository.updateUser(id, firstName,surname, email, password);
      if (!admin) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Admin not found');
      }

      return admin;
    } catch (error) {
      _logger.error('[AdminService]::Error updating admin', error);
      throw error;
    }
  };

  static deleteAdmin = async (id: number) => {
    try {
      const admin = await AdminRepository.deleteAdmin(id);
      if (!admin) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Admin not found');
      }
      return admin;
    } catch (error) {
      _logger.error('[AdminService]::Error deleting admin', error);
      throw error;
    }
  };
}

