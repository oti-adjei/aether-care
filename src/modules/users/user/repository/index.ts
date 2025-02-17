import { sqlQuest } from '../../../../config/database';
import Logger from '../../../../config/logger';
import { UserQueries } from '../queries';


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
      const user = await sqlQuest.one(UserQueries.createUser, [
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

  static fetchUserById = async (user_id: string) => {
    try {
      const user = await sqlQuest.oneOrNone(UserQueries.fetchUser, [user_id]);
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
      const users = await sqlQuest.manyOrNone(UserQueries.fetchAllUsers);
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
      const user = await sqlQuest.oneOrNone(UserQueries.fetchUserByEmail, [email]);
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
    user_id: string,
    first_name?: string,
    surname?: string,
    email?: string,
    password?: string
  ) => {
    try {
      const user = await sqlQuest.oneOrNone(UserQueries.updateUser, [
        first_name,
        surname,
        email,
        password,
        user_id
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

  static deleteUser = async (user_id: string) => {
    try {
      const user = await sqlQuest.oneOrNone(UserQueries.deleteUser, [user_id]);
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

