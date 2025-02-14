import Logger from '../../../../config/logger';
import { sqlQuest } from 'src/config/database';
import { remindersQueries } from '../queries';

const _logger = new Logger('Meidcal History');

export class ReminderRepository {
  static async fetchRemindersByPatient(id: number) {
   try {
         const reminders = sqlQuest.manyOrNone(remindersQueries.fetchRemindersByPatient, [id]);
         return reminders;
       } catch (error) {
         _logger.error('[ReminderRepository]::Something went wrong when fetching reminders by patient', error);
         throw error;
       }
  }

  static async fetchAllReminders() {
    try {
      const reminders = await sqlQuest.manyOrNone(remindersQueries.fetchAllReminders);
      return reminders;
    } catch (error) {
      _logger.error('[ReminderRepository]::Something went wrong when fetching all reminders', error);
      throw error;
    }
  }

  static async fetchReminder(id: number) {
    try {
      const reminder = await sqlQuest.oneOrNone(remindersQueries.fetchReminder, [id]);
      return reminder;
    } catch (error) {
      _logger.error('[ReminderRepository]::Something went wrong when fetching reminder', error);
      throw error;
    }
  }

  static async createReminder(payload: any) {
    const {patient_id, step_id, reminder_time, status} = payload
    try {
      const reminder = await sqlQuest.oneOrNone(remindersQueries.createReminder, [patient_id, step_id, reminder_time, status]);
      return reminder;
    } catch (error) {
      _logger.error('[ReminderRepository]::Something went wrong when creating reminder', error);
      throw error;
    }
  }

  static async updateReminder(id: number, payload: any) {
    const {patient_id, step_id, reminder_time, status} = payload
    try {
      const reminder = await sqlQuest.oneOrNone(remindersQueries.updateReminder, [id, patient_id, step_id, reminder_time, status]);
      return reminder;
    } catch (error) {
      _logger.error('[ReminderRepository]::Something went wrong when updating reminder', error);
      throw error;
    }
  }

  static async deleteReminder(id: number) {
    try {
      const reminder = await sqlQuest.oneOrNone(remindersQueries.deleteReminder, [id]);
      return reminder;
    } catch (error) {
      _logger.error('[ReminderRepository]::Something went wrong when deleting reminder', error);
      throw error;
    }
  }
}