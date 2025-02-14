import { ResponseHandler } from '../../../shared/helpers/response.handler';
import { Request, Response } from 'express';
import Logger from '../../../config/logger';
import { PatientService } from './service';
import { StatusCodes } from 'http-status-codes';
import {  fetchPatientByIdSchema, 
  fetchPatientByEmailSchema, 
  createPatientSchema, 
  updatePatientSchema, 
  deletePatientSchema   } from './validation';
// import { RiderService } from '../courier/service';

const _logger = new Logger('UserController');

export class PatientController {
  static fetchPatient = async (req: Request, res: Response) => {
    try {
      const { patient_id } = fetchPatientByIdSchema.parse(req.params);

      const patient = await PatientService.fetchPatient(patient_id);
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Patient fetched successfully',
        code: StatusCodes.OK,
        data: patient,
      });
    } catch (error) {
      _logger.error(
        '[PatientController]::Something went wrong when fetching patient',
        error,
      );
      throw error;
    }
  };

  static fetchPatientByEmail = async (req: Request, res: Response) => {
    try {
      const { email } = fetchPatientByEmailSchema.parse(req.params);

      const patient = await PatientService.fetchPatientByEmail(email);
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Patient fetched successfully',
        code: StatusCodes.OK,
        data: patient,
      });
    } catch (error) {
      _logger.error(
        '[PatientController]::Something went wrong when fetching patient by email',
        error,
      );
      throw error;
    }
  };

  static fetchAllPatients = async (req: Request, res: Response) => {
    try {
      const patients = await PatientService.fetchAllPatients();
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Patients fetched successfully',
        code: StatusCodes.OK,
        data: patients,
      });
    } catch (error) {
      _logger.error(
        '[PatientController]::Something went wrong when fetching all patients',
        error,
      );
      throw error;
    }
  };

  static createPatient = async (req: Request, res: Response) => {
    try {
      const payload = createPatientSchema.parse(req.body);

      const patient = await PatientService.createPatient(payload);
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Patient created successfully',
        code: StatusCodes.CREATED,
        data: patient,
      });
    } catch (error) {
      _logger.error(
        '[PatientController]::Something went wrong when creating patient',
        error,
      );
      throw error;
    }
  };

  static updatePatient = async (req: Request, res: Response) => {
    try {
      const { id } = updatePatientSchema.parse(req.params);
      const updateData = updatePatientSchema.parse(req.body);

      const patient = await PatientService.updatePatient(id, updateData);
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Patient updated successfully',
        code: StatusCodes.OK,
        data: patient,
      });
    } catch (error) {
      _logger.error(
        '[PatientController]::Something went wrong when updating patient',
        error,
      );
      throw error;
    }
  };

  static deletePatient = async (req: Request, res: Response) => {
    try {
      const { id } = deletePatientSchema.parse(req.params);

      await PatientService.deletePatient(id);
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Patient deleted successfully',
        code: StatusCodes.NO_CONTENT,
        data: null,
      });
    } catch (error) {
      _logger.error(
        '[PatientController]::Something went wrong when deleting patient',
        error,
      );
      throw error;
    }
  };
}



