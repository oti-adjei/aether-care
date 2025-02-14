import { sqlQuest } from '../../../../config/database';
import Logger from '../../../../config/logger';
import { patientDoctorAssignmentQueries } from '../queries/';


const _logger = new Logger('Meidcal History');


export class PatientDoctorAssignmentRepository {
  static fetchAssignment(id: number) {
    try {
      const doctors = sqlQuest.manyOrNone(patientDoctorAssignmentQueries.fetchAssignment, [id]);
      return doctors;
    } catch (error) {
      _logger.error('[PatientDoctorAssignmentRepository]::Something went wrong when fetching doctors by patient', error);
      throw error;
    }
  }
  static async assignDoctorToPatient(patientId: number, doctorId: number) {
    try {
      const assignment = await sqlQuest.one(patientDoctorAssignmentQueries.createAssignment, [patientId, doctorId]);
      return assignment;
    } catch (error) {
      _logger.error('[PatientDoctorAssignmentRepository]::Something went wrong when assigning doctor to patient', error);
      throw error;
    }
  }

  static async fetchAssignmentsByPatient(patientId: number) {
    try {
      const assignments = await sqlQuest.manyOrNone(patientDoctorAssignmentQueries.fetchAssignmentsByPatient, [patientId]);
      return assignments;
    } catch (error) {
      _logger.error('[PatientDoctorAssignmentRepository]::Something went wrong when fetching assignments by patient', error);
      throw error;
    }
  }

  static async fetchAssignmentsByDoctor(doctorId: number) {
    try {
      const assignments = await sqlQuest.manyOrNone(patientDoctorAssignmentQueries.fetchAssignmentsByDoctor, [doctorId]);
      return assignments;
    } catch (error) {
      _logger.error('[PatientDoctorAssignmentRepository]::Something went wrong when fetching assignments by doctor', error);
      throw error;
    }
  }

  static async fetchAllAssignments() {
    try {
      const assignments = await sqlQuest.manyOrNone(patientDoctorAssignmentQueries.fetchAllAssignments);
      return assignments;
    } catch (error) {
      _logger.error('[PatientDoctorAssignmentRepository]::Something went wrong when fetching all assignments', error);
      throw error;
    }
  }

  static fetchDoctorsByPatient(patientId: number) {
    try {
      const doctors = sqlQuest.manyOrNone(patientDoctorAssignmentQueries.fetchDoctorsByPatient, [patientId]);
      return doctors;
    } catch (error) {
      _logger.error('[PatientDoctorAssignmentRepository]::Something went wrong when fetching doctors by patient', error);
      throw error;
    }
  }

  static async unassignDoctorFromPatient(patientId: number, doctorId: number) {
    try {
      const unassignment = await sqlQuest.oneOrNone(patientDoctorAssignmentQueries.deleteAssignment, [patientId, doctorId]);
      return unassignment;
    } catch (error) {
      _logger.error('[PatientDoctorAssignmentRepository]::Something went wrong when unassigning doctor from patient', error);
      throw error;
    }
  }
}
