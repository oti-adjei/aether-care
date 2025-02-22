import { sqlQuest } from '../../../../config/database';
import Logger from '../../../../config/logger';
import { patientQueries } from '../queries';
import { CreatePatientValidator, UpdatePatientValidator } from '../validation';


const _logger = new Logger('UserRepository');


export class PatientRepository {
  // doctor_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  // user_id UUID UNIQUE REFERENCES users(user_id) ON DELETE CASCADE,
  // specialty VARCHAR(255),
  // experience INTEGER CHECK (experience >= 0),
  // license_number VARCHAR(50) UNIQUE NOT NULL,
  // created_at TIMESTAMP DEFAULT NOW()
  static async createPatient(user_id:string,request : CreatePatientValidator) {
    try {
      const {date_of_birth,medical_history,gender} = request;
      const patient = await sqlQuest.one(patientQueries.createPatient, [user_id,date_of_birth,medical_history,gender]);
      return patient;
    } catch (error) {
      _logger.error('[PatientRepository]::Something went wrong when creating patient', error);
      throw error;
    }
  }

  static async fetchPatientById(patientId: string) {
    try {
      const patient = await sqlQuest.oneOrNone(patientQueries.fetchPatient, [patientId]);
      return patient;
    } catch (error) {
      _logger.error('[PatientRepository]::Something went wrong when fetching patient by ID', error);
      throw error;
    }
  }

  static async fetchPatientByEmail(email: string) {
    try {
      const patient = await sqlQuest.oneOrNone(patientQueries.fetchPatientByEmail, [email]);
      return patient;
    } catch (error) {
      _logger.error('[PatientRepository]::Something went wrong when fetching patient by email', error);
      throw error;
    }
  }

  static async fetchAllPatients() {
    try {
      const patients = await sqlQuest.manyOrNone(patientQueries.fetchAllPatients);
      return patients;
    } catch (error) {
      _logger.error('[PatientRepository]::Something went wrong when fetching all patients', error);
      throw error;
    }
  }

  static async updatePatient(user_id:string,request : UpdatePatientValidator) {
    try {
      const {date_of_birth,medical_history,gender} = request;
      const updatedPatient = await sqlQuest.one(patientQueries.updatePatient, [date_of_birth, medical_history, gender,user_id,]);
      return updatedPatient;
    } catch (error) {
      _logger.error('[PatientRepository]::Something went wrong when updating patient', error);
      throw error;
    }
  }

  static async deletePatient(patientId: string) {
    try {
      const deletedPatient = await sqlQuest.oneOrNone(patientQueries.deletePatient, [patientId]);
      return deletedPatient;
    } catch (error) {
      _logger.error('[PatientRepository]::Something went wrong when deleting patient', error);
      throw error;
    }
  }
}
