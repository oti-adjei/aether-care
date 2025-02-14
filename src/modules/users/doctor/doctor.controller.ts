import { ResponseHandler } from '../../../shared/helpers/response.handler';
import { Request, Response } from 'express';
import Logger from '../../../config/logger';
import { DoctorService,  } from './service';
import { StatusCodes } from 'http-status-codes';
import { fetchDoctorSchema, fetchDoctorByEmailSchema, createDoctorSchema, updateDoctorSchema } from './validation';


const _logger = new Logger('UserController');

export class DoctorController {
  static fetchDoctor = async (req: Request, res: Response) => {
    try {
      const { doctor_id } = fetchDoctorSchema.parse(req.params);

      const doctor = await DoctorService.fetchDoctor(doctor_id);
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Doctor fetched successfully',
        code: StatusCodes.OK,
        data: doctor,
      });
    } catch (error) {
      _logger.error(
        '[DoctorController]::Something went wrong when fetching doctor',
        error,
      );
      throw error;
    }
  };

  static fetchDoctorByEmail = async (req: Request, res: Response) => {
    try {
      const { email } = fetchDoctorByEmailSchema.parse(req.params);

      const doctor = await DoctorService.fetchDoctorByEmail(email);
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Doctor fetched successfully',
        code: StatusCodes.OK,
        data: doctor,
      });
    } catch (error) {
      _logger.error(
        '[DoctorController]::Something went wrong when fetching doctor by email',
        error,
      );
      throw error;
    }
  };

  static fetchAllDoctors = async (req: Request, res: Response) => {
    try {
      const doctors = await DoctorService.fetchAllDoctors();
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Doctors fetched successfully',
        code: StatusCodes.OK,
        data: doctors,
      });
    } catch (error) {
      _logger.error(
        '[DoctorController]::Something went wrong when fetching all doctors',
        error,
      );
      throw error;
    }
  };

  static createDoctor = async (req: Request, res: Response) => {
    try {
      const payload = createDoctorSchema.parse(req.body);

      const doctor = await DoctorService.createDoctor(payload);
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Doctor created successfully',
        code: StatusCodes.CREATED,
        data: doctor,
      });
    } catch (error) {
      _logger.error(
        '[DoctorController]::Something went wrong when creating doctor',
        error,
      );
      throw error;
    }
  };

  static updateDoctor = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updateData = updateDoctorSchema.parse(req.body);

      const doctor = await DoctorService.updateDoctor(id, updateData);
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Doctor updated successfully',
        code: StatusCodes.OK,
        data: doctor,
      });
    } catch (error) {
      _logger.error(
        '[DoctorController]::Something went wrong when updating doctor',
        error,
      );
      throw error;
    }
  };

  static deleteDoctor = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      await DoctorService.deleteDoctor(id);
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Doctor deleted successfully',
        code: StatusCodes.NO_CONTENT,
        data:null
      });
    } catch (error) {
      _logger.error(
        '[DoctorController]::Something went wrong when deleting doctor',
        error,
      );
      throw error;
    }
  };
}


