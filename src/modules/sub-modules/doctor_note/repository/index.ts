import { sqlQuest } from '../../../../config/database';
import { doctorNoteQueries } from '../queries';
import Logger from '../../../../config/logger';


const _logger = new Logger('Meidcal History');




export class DoctorNoteRepository {
  static async createDoctorNote(patientId: string, doctorId: string, note: string,iv: string) {
    try {
      const doctorNote = await sqlQuest.one(doctorNoteQueries.createDoctorNote, [patientId, doctorId, note,iv]);
      return doctorNote;
    } catch (error) {
      _logger.error('[DoctorNoteRepository]::Something went wrong when creating doctor note', error);
      throw error;
    }
  }

  static async fetchDoctorNoteById(noteId: number) {
    try {
      const doctorNote = await sqlQuest.oneOrNone(doctorNoteQueries.fetchDoctorNote, [noteId]);
      return doctorNote;
    } catch (error) {
      _logger.error('[DoctorNoteRepository]::Something went wrong when fetching doctor note by ID', error);
      throw error;
    }
  }

  static async fetchDoctorNotesByPatient(patientId: number) {
    try {
      const doctorNotes = await sqlQuest.manyOrNone(doctorNoteQueries.fetchDOctorNotesByPatient, [patientId]);
      return doctorNotes;
    } catch (error) {
      _logger.error('[DoctorNoteRepository]::Something went wrong when fetching doctor notes by patient', error);
      throw error;
    }
  }

  static async fetchAllDoctorNotes() {
    try {
      const doctorNotes = await sqlQuest.manyOrNone(doctorNoteQueries.fetchAllDoctorNotes);
      return doctorNotes;
    } catch (error) {
      _logger.error('[DoctorNoteRepository]::Something went wrong when fetching all doctor notes', error);
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
      const softDeletedDoctorNote = await sqlQuest.oneOrNone(doctorNoteQueries.deleteDoctorNote, [noteId]);
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

  static async fetchDeletedDoctorNotes() {
    try {
      const deletedDoctorNotes = await sqlQuest.manyOrNone(doctorNoteQueries.fetchDeletedDoctorNotes);
      return deletedDoctorNotes;
    } catch (error) {
      _logger.error('[DoctorNoteRepository]::Something went wrong when fetching deleted doctor notes', error);
      throw error;
    }
  }

  static async fetchDeletedDoctorNotesByPatient(patientId: string) {
    try {
      const deletedDoctorNotes = await sqlQuest.manyOrNone(doctorNoteQueries.fetchDeletedDoctorNotesByPatient, [patientId]);
      return deletedDoctorNotes;
    } catch (error) {
      _logger.error('[DoctorNoteRepository]::Something went wrong when fetching deleted doctor notes by patient', error);
      throw error;
    }
  }
}
