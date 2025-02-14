import { UserAccount, UserAccountEmail, } from '../../../../shared/helpers/sanitize.input';
import { sqlQuest } from '../../../../config/database';
import Logger from '../../../../config/logger';
import { userQueries } from '../queries';
import { ConsumerUserType } from '../validation';

const _logger = new Logger('UserRepository');


export class UserRepository {
  static createUser = async (
    first_name: string,
    surname: string,
    email: string,
    password: string,
    role: string
  ) => {
    try {
      const user = await sqlQuest.one(userQueries.createUser, [
        first_name,
        surname,
        email,
        password,
        role
      ]);
      return user;
    } catch (error) {
      _logger.error(
        '[UserRepository]::Error creating user',
        error
      );
      throw error;
    }
  };

  static fetchUserById = async (id: number) => {
    try {
      const user = await sqlQuest.oneOrNone(userQueries.fetchUserById, [id]);
      return user;
    } catch (error) {
      _logger.error(
        '[UserRepository]::Error fetching user by ID',
        error
      );
      throw error;
    }
  };

  static fetchAllUsers = async () => {
    try {
      const users = await sqlQuest.manyOrNone(userQueries.fetchAllUsers);
      return users;
    } catch (error) {
      _logger.error(
        '[UserRepository]::Error fetching all users',
        error
      );
      throw error;
    }
  };

  static fetchUserByEmail = async (email: string) => {
    try {
      const user = await sqlQuest.oneOrNone(userQueries.fetchUserByEmail, [email]);
      return user;
    } catch (error) {
      _logger.error(
        '[UserRepository]::Error fetching user by email',
        error
      );
      throw error;
    }
  };

  static updateUser = async (
    id: number,
    first_name?: string,
    surname?: string,
    email?: string,
    password?: string
  ) => {
    try {
      const user = await sqlQuest.one(userQueries.updateUser, [
        first_name,
        surname,
        email,
        password,
        id
      ]);
      return user;
    } catch (error) {
      _logger.error(
        '[UserRepository]::Error updating user',
        error
      );
      throw error;
    }
  };

  static deleteUser = async (id: number) => {
    try {
      const user = await sqlQuest.oneOrNone(userQueries.deleteUser, [id]);
      return user;
    } catch (error) {
      _logger.error(
        '[UserRepository]::Error deleting user',
        error
      );
      throw error;
    }
  };
}

