import { ResponseHandler } from '../../../shared/helpers/response.handler';
import { Request, Response } from 'express';
import Logger from '../../../config/logger';
import { StatusCodes } from 'http-status-codes';
import { createDoctorNoteSchema,
  updateDoctorNoteSchema,
  fetchDoctorNoteByIdSchema, } from './validation';
import { DoctorNoteService } from './service';


const _logger = new Logger('Meidcal History');

export class DoctorNotesController {
  static async createDoctorNote(req: Request, res: Response) {
    try {
      const payload = createDoctorNoteSchema.parse(req.body);

      const note = await DoctorNoteService.createDoctorNote(payload);
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Doctor note created successfully',
        code: StatusCodes.CREATED,
        data: note,
      });
    } catch (error) {
      _logger.error(
        '[DoctorNotesController]::Something went wrong when creating doctor note',
        error,
      );
      throw error;
    }
  }

  static async fetchDoctorNote(req: Request, res: Response) {
    try {
      const { note_id } = fetchDoctorNoteByIdSchema.parse(req.params);

      const note = await DoctorNoteService.fetchDoctorNoteById(parseInt(note_id));
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Doctor note fetched successfully',
        code: StatusCodes.OK,
        data: note,
      });
    } catch (error) {
      _logger.error(
        '[DoctorNotesController]::Something went wrong when fetching doctor note',
        error,
      );
      throw error;
    }
  }

  static async fetchAllDoctorNotes(req: Request, res: Response) {
    try {
      const notes = await DoctorNoteService.fetchAllDoctorNotes();
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Doctor notes fetched successfully',
        code: StatusCodes.OK,
        data: notes,
      });
    } catch (error) {
      _logger.error(
        '[DoctorNotesController]::Something went wrong when fetching all doctor notes',
        error,
      );
      throw error;
    }
  }

  static async updateDoctorNote(req: Request, res: Response) {
    try {
      const { note_id } = fetchDoctorNoteByIdSchema.parse(req.params);
      const payload = updateDoctorNoteSchema.parse(req.body);

      const note = await DoctorNoteService.updateDoctorNote(parseInt(note_id), payload);
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Doctor note updated successfully',
        code: StatusCodes.OK,
        data: note,
      });
    } catch (error) {
      _logger.error(
        '[DoctorNotesController]::Something went wrong when updating doctor note',
        error,
      );
      throw error;
    }
  }

  static async deleteDoctorNote(req: Request, res: Response) {
    try {
      const { note_id } = fetchDoctorNoteByIdSchema.parse(req.params);

      const note = await DoctorNoteService.softDeleteDoctorNote(parseInt(note_id));
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Doctor note deleted successfully',
        code: StatusCodes.NO_CONTENT,
        data: note,
      });
    } catch (error) {
      _logger.error(
        '[DoctorNotesController]::Something went wrong when deleting doctor note',
        error,
      );
      throw error;
    }
  }

  static async restoreDoctorNote(req: Request, res: Response) {
    try {
      const { note_id } = fetchDoctorNoteByIdSchema.parse(req.params);

      await DoctorNoteService.restoreDoctorNote(parseInt(note_id));
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Doctor note restored successfully',
        code: StatusCodes.OK,
        data: note_id,
      });
    } catch (error) {
      _logger.error(
        '[DoctorNotesController]::Something went wrong when restoring doctor note',
        error,
      );
      throw error;
    }
  }

  static async fetchDeletedDoctorNotes(req: Request, res: Response) {
    try {
      const notes = await DoctorNoteService.fetchDeletedDoctorNotes();
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Deleted doctor notes fetched successfully',
        code: StatusCodes.OK,
        data: notes,
      });
    } catch (error) {
      _logger.error(
        '[DoctorNotesController]::Something went wrong when fetching deleted doctor notes',
        error,
      );
      throw error;
    }
  }

  static async fetchDeletedDoctorNotesByPatient(req: Request, res: Response) {
    try {
      const { patient_id } = req.params;
      const notes = await DoctorNoteService.fetchDeletedDoctorNotesByPatient(patient_id);
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Deleted doctor notes fetched successfully',
        code: StatusCodes.OK,
        data: notes,
      });
    } catch (error) {
      _logger.error(
        '[DoctorNotesController]::Something went wrong when fetching deleted doctor notes by patient',
        error,
      );
      throw error;
    }
  }
}
