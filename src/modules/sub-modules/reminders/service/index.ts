import Logger from '../../../../config/logger';
import { StatusCodes } from 'http-status-codes';

import { ApiError } from 'src/shared/utils/api.error';
import { ReminderRepository } from '../repository';

const _logger = new Logger('Meidcal History');

export class RemindersService {

  static fetchReminder = async (id: number) => {
    try {
      const reminders = await ReminderRepository.fetchReminder(id);
    if (!reminders) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Reminders not found');
    }
      return reminders;
    } catch (error) {
      _logger.error('[ReminderService]::Something went wrong when fetching reminders', error);
      throw error;
    }
  }
  static async getReminders() {
    try {
      const reminders = await ReminderRepository.fetchAllReminders();
    if (!reminders) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Reminders not found');
    }
      return reminders;
    } catch (error) {
      _logger.error('[ReminderService]::Something went wrong when fetching reminders', error);
      throw error;
    }
    
  }

  static async getRemindersByPatient(req: any) {
    try {
      const reminders = await ReminderRepository.fetchRemindersByPatient(req.params.id);
    if (!reminders) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Reminders not found');
    }
      return reminders;
    } catch (error) {
      _logger.error('[ReminderService]::Something went wrong when fetching reminders', error);
      throw error;
    }
    
  }

  static async createReminder(req: any) {
    try {
      const reminders = await ReminderRepository.createReminder(req.body);
    if (!reminders) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Reminders not found');
    }
      return reminders;
    } catch (error) {
      _logger.error('[ReminderService]::Something went wrong when fetching reminders', error);
      throw error;
    }
    
  }

  static async updateReminder(rmeinder_id: number,req: any) {
    try {
      const reminders = await ReminderRepository.updateReminder(rmeinder_id, req.body);
    if (!reminders) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Reminders not found');
    }
      return reminders;
    } catch (error) {
      _logger.error('[ReminderService]::Something went wrong when fetching reminders', error);
      throw error;
    }
    
  }

  static async deleteReminder(req: any) {
    try {
      const reminders = await ReminderRepository.deleteReminder(req.params.id);
    if (!reminders) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Reminders not found');
    }
      return reminders;
    } catch (error) {
      _logger.error('[ReminderService]::Something went wrong when fetching reminders', error);
      throw error;
    }
    
  }

}