import { ResponseHandler } from '../../../shared/helpers/response.handler';
import { Request, Response } from 'express';
import Logger from '../../../config/logger';
import { AdminService } from './service';
import { StatusCodes } from 'http-status-codes';
import {fetchAdminByIdSchema, fetchAdminByEmailSchema, createAdminSchema, updateAdminSchema, deleteAdminSchema, updateAdminIdSchema } from './validation';

const _logger = new Logger('UserController');

export class AdminController {
  static fetchAdmin = async (req: Request, res: Response) => {
    try {
      const { admin_id } = fetchAdminByIdSchema.parse(req.params);

      const admin = await AdminService.fetchAdmin(admin_id);
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Admin fetched successfully',
        code: StatusCodes.OK,
        data: admin,
      });
    } catch (error) {
      _logger.error(
        '[AdminController]::Something went wrong when fetching admin',
        error,
      );
      throw error;
    }
  };

  static fetchAdminByEmail = async (req: Request, res: Response) => {
    try {
      const { email } = fetchAdminByEmailSchema.parse(req.params);

      const admin = await AdminService.fetchAdminByEmail(email);
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Admin fetched successfully',
        code: StatusCodes.OK,
        data: admin,
      });
    } catch (error) {
      _logger.error(
        '[AdminController]::Something went wrong when fetching admin by email',
        error,
      );
      throw error;
    }
  };

  static fetchAllAdmins = async (req: Request, res: Response) => {
    try {
      const admins = await AdminService.fetchAllAdmins();
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Admins fetched successfully',
        code: StatusCodes.OK,
        data: admins,
      });
    } catch (error) {
      _logger.error(
        '[AdminController]::Something went wrong when fetching all admins',
        error,
      );
      throw error;
    }
  };

  static createAdmin = async (req: Request, res: Response) => {
    try {
      const payload = createAdminSchema.parse(req.body);

      const admin = await AdminService.createAdmin(payload);
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Admin created successfully',
        code: StatusCodes.CREATED,
        data: admin,
      });
    } catch (error) {
      _logger.error(
        '[AdminController]::Something went wrong when creating admin',
        error,
      );
      throw error;
    }
  };

  static updateAdmin = async (req: Request, res: Response) => {
    try {
      const { admin_id } = updateAdminIdSchema.parse(req.params);
      const updateData = updateAdminSchema.parse(req.body);

      const admin = await AdminService.updateAdmin(admin_id,updateData);
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Admin updated successfully',
        code: StatusCodes.OK,
        data: admin,
      });
    } catch (error) {
      _logger.error(
        '[AdminController]::Something went wrong when updating admin',
        error,
      );
      throw error;
    }
  };

  static deleteAdmin = async (req: Request, res: Response) => {
    try {
      const { admin_id } = deleteAdminSchema.parse(req.params);

      await AdminService.deleteAdmin((admin_id));
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Admin deleted successfully',
        code: StatusCodes.NO_CONTENT,
        data: null,
      });
    } catch (error) {
      _logger.error(
        '[AdminController]::Something went wrong when deleting admin',
        error,
      );
      throw error;
    }
  };
}

