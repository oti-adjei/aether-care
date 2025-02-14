import { ResponseHandler } from '../../../shared/helpers/response.handler';
import { Request, Response } from 'express';
import Logger from '../../../config/logger';
import { StatusCodes } from 'http-status-codes';
import {  fetchMedicalHistoryByIdSchema, fetchMedicalHistoryByPatientSchema, createMedicalHistorySchema, updateMedicalHistorySchema, deleteMedicalHistorySchema  } from './validation';
import { MedicalHistoryService } from './service';

const _logger = new Logger('Meidcal History');

export class MedicalHistoryController {
  static fetchMedicalHistory = async (req: Request, res: Response) => {
    try {
      const { history_id } = fetchMedicalHistoryByIdSchema.parse(req.params);

      const history = await MedicalHistoryService.fetchMedicalHistory(history_id);
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Medical history fetched successfully',
        code: StatusCodes.OK,
        data: history,
      });
    } catch (error) {
      _logger.error(
        '[MedicalHistoryController]::Something went wrong when fetching medical history',
        error,
      );
      throw error;
    }
  };

  static fetchMedicalHistoryByPatient = async (req: Request, res: Response) => {
    try {
      const { patient_id } = fetchMedicalHistoryByPatientSchema.parse(req.params);

      const history = await MedicalHistoryService.fetchMedicalHistoryByPatient(patient_id);
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Medical history fetched successfully',
        code: StatusCodes.OK,
        data: history,
      });
    } catch (error) {
      _logger.error(
        '[MedicalHistoryController]::Something went wrong when fetching medical history by patient',
        error,
      );
      throw error;
    }
  };

  static fetchAllMedicalHistories = async (req: Request, res: Response) => {
    try {
      const histories = await MedicalHistoryService.fetchAllMedicalHistories();
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Medical histories fetched successfully',
        code: StatusCodes.OK,
        data: histories,
      });
    } catch (error) {
      _logger.error(
        '[MedicalHistoryController]::Something went wrong when fetching all medical histories',
        error,
      );
      throw error;
    }
  };

  static createMedicalHistory = async (req: Request, res: Response) => {
    try {
      const payload = createMedicalHistorySchema.parse(req.body);

      const history = await MedicalHistoryService.createMedicalHistory(payload);
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Medical history created successfully',
        code: StatusCodes.CREATED,
        data: history,
      });
    } catch (error) {
      _logger.error(
        '[MedicalHistoryController]::Something went wrong when creating medical history',
        error,
      );
      throw error;
    }
  };

  static updateMedicalHistory = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updateData = updateMedicalHistorySchema.parse(req.body);

      const history = await MedicalHistoryService.updateMedicalHistory(id, updateData);
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Medical history updated successfully',
        code: StatusCodes.OK,
        data: history,
      });
    } catch (error) {
      _logger.error(
        '[MedicalHistoryController]::Something went wrong when updating medical history',
        error,
      );
      throw error;
    }
  };

  static deleteMedicalHistory = async (req: Request, res: Response) => {
    try {
      const { history_id } = deleteMedicalHistorySchema.parse(req.params);

      await MedicalHistoryService.deleteMedicalHistory(history_id);
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Medical history deleted successfully',
        code: StatusCodes.NO_CONTENT,
        data: null
      });
    } catch (error) {
      _logger.error(
        '[MedicalHistoryController]::Something went wrong when deleting medical history',
        error,
      );
      throw error;
    }
  };
}
