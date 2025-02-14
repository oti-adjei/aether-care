import { ResponseHandler } from '../../../shared/helpers/response.handler';
import { Request, Response } from 'express';
import Logger from '../../../config/logger';
import { UserService } from '../../users/user/service';
import { StatusCodes } from 'http-status-codes';
import {   CreateReminderSchema,
  UpdateReminderSchema,
  FetchReminderSchema, } from './validation';
import { TotpHelper } from '../../../shared/helpers/totpHelper';
import { AuthService } from './service';

const _logger = new Logger('Meidcal History');

export class RemindersController {
  static async createReminder(req: Request, res: Response) {
    try {
      const payload = CreateReminderSchema.parse(req.body);

      const reminder = await RemindersService.createReminder(payload);
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Reminder created successfully',
        code: StatusCodes.CREATED,
        data: reminder,
      });
    } catch (error) {
      _logger.error(
        '[RemindersController]::Something went wrong when creating reminder',
        error,
      );
      throw error;
    }
  }

  static async fetchReminder(req: Request, res: Response) {
    try {
      const { reminder_id } = FetchReminderSchema.parse(req.params);

      const reminder = await RemindersService.fetchReminder(reminder_id);
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Reminder fetched successfully',
        code: StatusCodes.OK,
        data: reminder,
      });
    } catch (error) {
      _logger.error(
        '[RemindersController]::Something went wrong when fetching reminder',
        error,
      );
      throw error;
    }
  }

  static async fetchAllReminders(req: Request, res: Response) {
    try {
      const reminders = await RemindersService.fetchAllReminders();
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Reminders fetched successfully',
        code: StatusCodes.OK,
        data: reminders,
      });
    } catch (error) {
      _logger.error(
        '[RemindersController]::Something went wrong when fetching all reminders',
        error,
      );
      throw error;
    }
  }

  static async updateReminder(req: Request, res: Response) {
    try {
      const { reminder_id } = FetchReminderSchema.parse(req.params);
      const payload = UpdateReminderSchema.parse(req.body);

      const reminder = await RemindersService.updateReminder(reminder_id, payload);
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Reminder updated successfully',
        code: StatusCodes.OK,
        data: reminder,
      });
    } catch (error) {
      _logger.error(
        '[RemindersController]::Something went wrong when updating reminder',
        error,
      );
      throw error;
    }
  }

  static async deleteReminder(req: Request, res: Response) {
    try {
      const { reminder_id } = FetchReminderSchema.parse(req.params);

      await RemindersService.deleteReminder(reminder_id);
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Reminder deleted successfully',
        code: StatusCodes.NO_CONTENT,
      });
    } catch (error) {
      _logger.error(
        '[RemindersController]::Something went wrong when deleting reminder',
        error,
      );
      throw error;
    }
  }
}
