import { ResponseHandler } from '../../../shared/helpers/response.handler';
import { Request, Response } from 'express';
import Logger from '../../../config/logger';
import { UserService } from '../../users/user/service';
import { StatusCodes } from 'http-status-codes';
import { CreateDoctorNoteSchema,
  UpdateDoctorNoteSchema,
  FetchDoctorNoteSchema, } from './validation';
import { TotpHelper } from '../../../shared/helpers/totpHelper';
import { AuthService } from './service';

const _logger = new Logger('Meidcal History');

export class DoctorNotesController {
  static async createDoctorNote(req: Request, res: Response) {
    try {
      const payload = CreateDoctorNoteSchema.parse(req.body);

      const note = await DoctorNotesService.createDoctorNote(payload);
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
      const { note_id } = FetchDoctorNoteSchema.parse(req.params);

      const note = await DoctorNotesService.fetchDoctorNote(note_id);
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
      const notes = await DoctorNotesService.fetchAllDoctorNotes();
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
      const { note_id } = FetchDoctorNoteSchema.parse(req.params);
      const payload = UpdateDoctorNoteSchema.parse(req.body);

      const note = await DoctorNotesService.updateDoctorNote(note_id, payload);
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
      const { note_id } = FetchDoctorNoteSchema.parse(req.params);

      await DoctorNotesService.softDeleteDoctorNote(note_id);
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Doctor note deleted successfully',
        code: StatusCodes.NO_CONTENT,
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
      const { note_id } = FetchDoctorNoteSchema.parse(req.params);

      await DoctorNotesService.restoreDoctorNote(note_id);
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Doctor note restored successfully',
        code: StatusCodes.OK,
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
      const notes = await DoctorNotesService.fetchDeletedDoctorNotes();
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
}
