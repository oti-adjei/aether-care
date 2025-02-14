import { ResponseHandler } from '../../../shared/helpers/response.handler';
import { Request, Response } from 'express';
import Logger from '../../../config/logger';
import { UserService } from '../../users/user/service';
import { StatusCodes } from 'http-status-codes';
import {  AssignDoctorSchema, 
  FetchAssignmentSchema, 
  DeleteAssignmentSchema  } from './validation';
import { TotpHelper } from '../../../shared/helpers/totpHelper';
import { AuthService } from './service';

const _logger = new Logger('Meidcal History');

export class PatientDoctorAssignmentController {
  static fetchAssignment = async (req: Request, res: Response) => {
    try {
      const { patient_id, doctor_id } = FetchAssignmentSchema.parse(req.params);

      const assignment = await PatientDoctorAssignmentService.fetchAssignment(patient_id, doctor_id);
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Assignment fetched successfully',
        code: StatusCodes.OK,
        data: assignment,
      });
    } catch (error) {
      _logger.error(
        '[PatientDoctorAssignmentController]::Something went wrong when fetching assignment',
        error,
      );
      throw error;
    }
  };

  static fetchAllAssignments = async (req: Request, res: Response) => {
    try {
      const assignments = await PatientDoctorAssignmentService.fetchAllAssignments();
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Assignments fetched successfully',
        code: StatusCodes.OK,
        data: assignments,
      });
    } catch (error) {
      _logger.error(
        '[PatientDoctorAssignmentController]::Something went wrong when fetching all assignments',
        error,
      );
      throw error;
    }
  };

  static assignDoctor = async (req: Request, res: Response) => {
    try {
      const payload = AssignDoctorSchema.parse(req.body);

      const assignment = await PatientDoctorAssignmentService.assignDoctor(payload);
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Doctor assigned successfully',
        code: StatusCodes.CREATED,
        data: assignment,
      });
    } catch (error) {
      _logger.error(
        '[PatientDoctorAssignmentController]::Something went wrong when assigning doctor',
        error,
      );
      throw error;
    }
  };

  static unassignDoctor = async (req: Request, res: Response) => {
    try {
      const { patient_id, doctor_id } = DeleteAssignmentSchema.parse(req.params);

      await PatientDoctorAssignmentService.unassignDoctor(patient_id, doctor_id);
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Doctor unassigned successfully',
        code: StatusCodes.NO_CONTENT,
      });
    } catch (error) {
      _logger.error(
        '[PatientDoctorAssignmentController]::Something went wrong when unassigning doctor',
        error,
      );
      throw error;
    }
  };
}
