import { ResponseHandler } from '../../../shared/helpers/response.handler';
import { Request, Response } from 'express';
import Logger from '../../../config/logger';
import { UserService } from './service';
import { StatusCodes } from 'http-status-codes';
import { FetchUserByIdSchema, FetchUserByEmailSchema, CreateUserSchema, UpdateUserSchema, DeleteUserSchema, SendPhoneNumberOtpValidator, VerifyPhoneNumberOtpValidator, SendUserType, } from './validation';
// import { RiderService } from '../courier/service';

const _logger = new Logger('UserController');


export default class UsersController {
  static fetchUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const user = await UserService.fetchUser(parseInt(id));
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'User fetched successfully',
        code: StatusCodes.OK,
        data: user,
      });
    } catch (error) {
      _logger.error('[UsersController]::Error fetching user', error);
      throw error;
    }
  };

  static fetchUserByEmail = async (req: Request, res: Response) => {
    try {
      const { email } = req.params;

      const user = await UserService.fetchUserByEmail(email);
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'User fetched successfully',
        code: StatusCodes.OK,
        data: user,
      });
    } catch (error) {
      _logger.error('[UsersController]::Error fetching user by email', error);
      throw error;
    }
  };

  static fetchAllUsers = async (_req: Request, res: Response) => {
    try {
      const users = await UserService.fetchAllUsers();
      const response = new ResponseHandler(_req, res);
      response.success({
        message: 'Users fetched successfully',
        code: StatusCodes.OK,
        data: users,
      });
    } catch (error) {
      _logger.error('[UsersController]::Error fetching all users', error);
      throw error;
    }
  };

  static createUser = async (req: Request, res: Response) => {
    try {
      const payload = req.body;

      const user = await UserService.createUser(payload);
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'User created successfully',
        code: StatusCodes.CREATED,
        data: user,
      });
    } catch (error) {
      _logger.error('[UsersController]::Error creating user', error);
      throw error;
    }
  };

  static updateUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const payload = req.body;

      
      // const user = await UserService.updateUser(id, payload);
      const user = await UserService.createUser(payload);
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'User updated successfully',
        code: StatusCodes.OK,
        data: user,
      });
    } catch (error) {
      _logger.error('[UsersController]::Error updating user', error);
      throw error;
    }
  };

  static deleteUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

     const user =  await UserService.deleteUser(parseInt(id));
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'User deleted successfully',
        code: StatusCodes.NO_CONTENT,
        data: user
      });
    } catch (error) {
      _logger.error('[UsersController]::Error deleting user', error);
      throw error;
    }
  };
}



