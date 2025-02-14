import { ApiError } from '../../../../shared/utils/api.error';
import Logger from '../../../../config/logger';
import { UserRepository } from '../repository';
import { StatusCodes } from 'http-status-codes';
import {
  sanitizeInput,
  NullableString,

} from '../../../../shared/helpers/sanitize.input';
import {
  ConsumerUserType,
  CreateUserSchema,
  LoginValidator,
  SendPhoneNumberOtpValidator,
  VerifyPhoneNumberOtpValidator,
} from '../validation/index';
import { GenericHelper } from '../../../../shared/helpers/generic.helper';
import Env from '../../../../shared/utils/env';
import * as jwt from 'jsonwebtoken';
// import logger from '../../../../config/logger';

const _logger = new Logger('UserService');

export class UserService {
  static fetchUser = async (id: number) => {
    try {
      const user = await UserRepository.fetchUser(id);
      if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
      }
      return user;
    } catch (error) {
      _logger.error('[UserService]::Error fetching user', error);
      throw error;
    }
  };

  static fetchUserByEmail = async (email: string) => {
    try {
      const user = await UserRepository.fetchUserByEmail(email);
      if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
      }
      return user;
    } catch (error) {
      _logger.error('[UserService]::Error fetching user by email', error);
      throw error;
    }
  };

  static fetchAllUsers = async () => {
    try {
      const user = await UserRepository.fetchAllUsers();
      if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
      }
      return user;
    } catch (error) {
      _logger.error(
        '[UserService]::Something went wrong when fetching user by email',
        error,
      );
      throw error;
    }
  };

  static createUser = async (request: CreateUserSchema) => {
    try {
      const existingUser = await UserRepository.fetchUserByEmail(request.email);
      if (existingUser) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'User already exists');
      }
      const user = await UserRepository.createUser(request);
      return user;
    } catch (error) {
      _logger.error('[UserService]::Error creating user', error);
      throw error;
    }
  };

  static updateUser = async (id: number, request: UpdateUserSchema) => {
    try {
      const user = await UserRepository.updateUser(id, request);
      if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
      }
      return user;
    } catch (error) {
      _logger.error('[UserService]::Error updating user', error);
      throw error;
    }
  };

  static deleteUser = async (id: number) => {
    try {
      const user = await UserRepository.deleteUser(id);
      if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
      }
      return user;
    } catch (error) {
      _logger.error('[UserService]::Error deleting user', error);
      throw error;
    }
  };
}



