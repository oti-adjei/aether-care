import { ResponseHandler } from '../../shared/helpers/response.handler';
import { Request, Response } from 'express';
import Logger from '../../config/logger';
import { UserService } from '../users/user/service';
import { StatusCodes } from 'http-status-codes';
import {  FetchMedicalHistoryByIdSchema, 
  FetchMedicalHistoryByPatientSchema, 
  CreateMedicalHistorySchema, 
  UpdateMedicalHistorySchema, 
  DeleteMedicalHistorySchema  } from './validation';
import { TotpHelper } from '../../shared/helpers/totpHelper';
import { AuthService } from './service';

const _logger = new Logger('Meidcal History');

import { sqlQuest } from '../database/sqlQuest';
import { _logger } from '../utils/logger';
import { doctorNoteQueries } from '../queries/doctorNoteQueries';

export class DoctorNoteRepository {
  static async createDoctorNote(patientId: number, doctorId: number, note: string) {
    try {
      const doctorNote = await sqlQuest.one(doctorNoteQueries.createDoctorNote, [patientId, doctorId, note]);
      return doctorNote;
    } catch (error) {
      _logger.error('[DoctorNoteRepository]::Something went wrong when creating doctor note', error);
      throw error;
    }
  }

  static async fetchDoctorNoteById(noteId: number) {
    try {
      const doctorNote = await sqlQuest.oneOrNone(doctorNoteQueries.fetchDoctorNoteById, [noteId]);
      return doctorNote;
    } catch (error) {
      _logger.error('[DoctorNoteRepository]::Something went wrong when fetching doctor note by ID', error);
      throw error;
    }
  }

  static async fetchDoctorNotesByPatient(patientId: number) {
    try {
      const doctorNotes = await sqlQuest.manyOrNone(doctorNoteQueries.fetchDoctorNotesByPatient, [patientId]);
      return doctorNotes;
    } catch (error) {
      _logger.error('[DoctorNoteRepository]::Something went wrong when fetching doctor notes by patient', error);
      throw error;
    }
  }

  static async updateDoctorNote(noteId: number, note: string) {
    try {
      const updatedDoctorNote = await sqlQuest.one(doctorNoteQueries.updateDoctorNote, [note, noteId]);
      return updatedDoctorNote;
    } catch (error) {
      _logger.error('[DoctorNoteRepository]::Something went wrong when updating doctor note', error);
      throw error;
    }
  }

  static async deleteDoctorNote(noteId: number) {
    try {
      const deletedDoctorNote = await sqlQuest.oneOrNone(doctorNoteQueries.deleteDoctorNote, [noteId]);
      return deletedDoctorNote;
    } catch (error) {
      _logger.error('[DoctorNoteRepository]::Something went wrong when deleting doctor note', error);
      throw error;
    }
  }

  static async softDeleteDoctorNote(noteId: number) {
    try {
      const softDeletedDoctorNote = await sqlQuest.oneOrNone(doctorNoteQueries.softDeleteDoctorNote, [noteId]);
      return softDeletedDoctorNote;
    } catch (error) {
      _logger.error('[DoctorNoteRepository]::Something went wrong when soft deleting doctor note', error);
      throw error;
    }
  }

  static async restoreDoctorNote(noteId: number) {
    try {
      const restoredDoctorNote = await sqlQuest.oneOrNone(doctorNoteQueries.restoreDoctorNote, [noteId]);
      return restoredDoctorNote;
    } catch (error) {
      _logger.error('[DoctorNoteRepository]::Something went wrong when restoring doctor note', error);
      throw error;
    }
  }
}
