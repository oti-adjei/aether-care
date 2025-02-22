import { ResponseHandler } from '../../shared/helpers/response.handler';
import { Request, Response } from 'express';
import Logger from '../../config/logger';
import { StatusCodes } from 'http-status-codes';
import {  createVisitLogSchema, fetchVisitLogByIdSchema, fetchVisitLogsByPatientSchema, 
   } from './validation';
import { VisitLogService } from './service';


const _logger = new Logger('VisitLogController');

export class VisitLogController {
  static fetchVisitLog = async (req: Request, res: Response) => {
    try {
      const { visit_id } = fetchVisitLogByIdSchema.parse(req.params);

      const visitLog = await VisitLogService.fetchVisitLog(visit_id);
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Visit log fetched successfully',
        code: StatusCodes.OK,
        data: visitLog,
      });
    } catch (error) {
      _logger.error(
        '[VisitLogController]::Something went wrong when fetching visit log',
        error,
      );
      throw error;
    }
  };

  static fetchPatientVisits = async (req: Request, res: Response) => {
    try {
      const { patient_id } = fetchVisitLogsByPatientSchema.parse(req.params);

      const visits = await VisitLogService.fetchVisitsByPatient(patient_id);
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Patient visit logs fetched successfully',
        code: StatusCodes.OK,
        data: visits,
      });
    } catch (error) {
      _logger.error(
        '[VisitLogController]::Something went wrong when fetching patient visits',
        error,
      );
      throw error;
    }
  };

  static createVisitLog = async (req: Request, res: Response) => {
    try {
      const payload = createVisitLogSchema.parse(req.body);

      const visitLog = await VisitLogService.createVisitLog(payload);
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Visit log created successfully',
        code: StatusCodes.CREATED,
        data: visitLog,
      });
    } catch (error) {
      _logger.error(
        '[VisitLogController]::Something went wrong when creating visit log',
        error,
      );
      throw error;
    }
  };
}
