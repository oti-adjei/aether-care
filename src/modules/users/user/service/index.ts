import { ApiError } from '../../../../shared/utils/api.error';
import Logger from '../../../../config/logger';
import { UserRepository } from '../repository';
import { StatusCodes } from 'http-status-codes';
import {
  CreateUserValidator,
  UpdateUserValidator,
} from '../validation/index';
// import logger from '../../../../config/logger';

const _logger = new Logger('UserService');

export class UserService {
  static fetchUserById = async (id: number) => {
    try {
      const user = await UserRepository.fetchUserById(id);
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

  static createUser = async (request: CreateUserValidator) => {
    const {first_name, surname, email, password, role} = request
    try {
      const existingUser = await UserRepository.fetchUserByEmail(request.email);
      if (existingUser) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'User already exists');
      }
      const user = await UserRepository.createUser(first_name, surname, email, password, role);
      return user;
    } catch (error) {
      _logger.error('[UserService]::Error creating user', error);
      throw error;
    }
  };

  static updateUser = async (id: string, request: UpdateUserValidator) => {
    const {firstName, surname, email, password} = request
    try {
      const user = await UserRepository.updateUser(id, firstName, surname, email, password);
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



