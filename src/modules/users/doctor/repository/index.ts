import { sqlQuest } from '../../../../config/database';
import Logger from '../../../../config/logger';
import { doctorQueries } from '../queries';

const _logger = new Logger('UserRepository');


export class DoctorRepository {
  static fetchDoctorByEmail(email: string) {
    try {
      return sqlQuest.oneOrNone(doctorQueries.fetchDoctorByEmail, [email]);
    } catch (error) {
      _logger.error(
        '[DoctorRepository]::Something went wrong when fetching doctor by email',
        error
      );
      throw error;
    }
  }
  static async checkIfDoctorExists(email: string) {
    try {
      const doctor = await this.fetchDoctorByEmail(email);
      if (doctor) {
        return true;
      }
      return false;
    } catch (error) {
      _logger.error(
        '[DoctorRepository]::Something went wrong when checking if doctor exists',
        error
      );
      throw error;
    }
  }
  static createDoctor = async (
    user_id: number,
    // phone_number: string,
    experience: number,
    specialization: string,
    license_number: string
  ) => {
    try {
      const doctor = await sqlQuest.one(doctorQueries.createDoctor, [
        user_id,
        // phone_number,
        experience,
        specialization,
        license_number,
      ]);
      return doctor;
    } catch (error) {
      _logger.error(
        '[DoctorRepository]::Something went wrong when creating doctor',
        error
      );
      throw error;
    }
  };

  static fetchDoctor = async (id: string) => {
    try {
      const doctor = await sqlQuest.oneOrNone(doctorQueries.fetchDoctor, [id]);
      return doctor;
    } catch (error) {
      _logger.error(
        '[DoctorRepository]::Something went wrong when fetching doctor',
        error
      );
      throw error;
    }
  };

  static fetchAllDoctors = async () => {
    try {
      const doctors = await sqlQuest.manyOrNone(doctorQueries.fetchAllDoctors);
      return doctors;
    } catch (error) {
      _logger.error(
        '[DoctorRepository]::Something went wrong when fetching all doctors',
        error
      );
      throw error;
    }
  };

  static updateDoctor = async (
    id: number,
    // phone_number?: string,
    experience?: number,
    specialization?: string,
    license_number?: string
  ) => {
    try {
      const doctor = await sqlQuest.one(doctorQueries.updateDoctor, [
        // phone_number,
        experience,
        specialization,
        license_number,
        id,
      ]);
      return doctor;
    } catch (error) {
      _logger.error(
        '[DoctorRepository]::Something went wrong when updating doctor',
        error
      );
      throw error;
    }
  };

  static deleteDoctor = async (id: string) => {
    try {
      const doctor = await sqlQuest.oneOrNone(doctorQueries.deleteDoctor, [id]);
      return doctor;
    } catch (error) {
      _logger.error(
        '[DoctorRepository]::Something went wrong when deleting doctor',
        error
      );
      throw error;
    }
  };
}

