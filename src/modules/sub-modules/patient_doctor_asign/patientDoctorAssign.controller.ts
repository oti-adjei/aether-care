import { ResponseHandler } from '../../../shared/helpers/response.handler';
import { Request, Response } from 'express';
import Logger from '../../../config/logger';
import { StatusCodes } from 'http-status-codes';
import { PatientDoctorAssignmentService } from './service';
import { createPatientDoctorAssignmentSchema, fetchPatientDoctorAssignmentByIdSchema } from './validation';



const _logger = new Logger('Meidcal History');

export class PatientDoctorAssignmentController {
  static fetchAssignment = async (req: Request, res: Response) => {
    try {
      const { assignment_id} = fetchPatientDoctorAssignmentByIdSchema.parse(req.params);

      const assignment = await PatientDoctorAssignmentService.fetchAssignment(parseInt(assignment_id));
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
      const payload = createPatientDoctorAssignmentSchema.parse(req.body);

      const assignment = await PatientDoctorAssignmentService.assignDoctorToPatient(payload);
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
      const { patient_id, doctor_id } = req.params;

      await PatientDoctorAssignmentService.unassignDoctorFromPatient(parseInt(patient_id), parseInt(doctor_id));
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Doctor unassigned successfully',
        code: StatusCodes.NO_CONTENT,
        data: null,
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
