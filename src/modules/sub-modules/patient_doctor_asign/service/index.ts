
import { ApiError } from '../../../../shared/utils/api.error';
import Logger from '../../../../config/logger';
import { StatusCodes } from 'http-status-codes';
import { PatientDoctorAssignmentRepository } from '../repository';


const _logger = new Logger('Meidcal History');

export class PatientDoctorAssignmentService {
  static assignDoctorToPatient = async (request:any) => {
    const { patient_id, doctor_id } = request;
    try {

      console.log("======VALUES======");
      console.log(request)
      const assignment = await PatientDoctorAssignmentRepository.assignDoctorToPatient(patient_id, doctor_id);
      if (!assignment) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to assign doctor to patient');
      }
      return assignment;
    } catch (error) {
      _logger.error('[PatientDoctorAssignmentService]::Error assigning doctor to patient', error);
      throw error;
    }
  };

  static fetchAssignment = async (id: number) => {
    try {
      const assignment = await PatientDoctorAssignmentRepository.fetchAssignment(id);
      if (!assignment) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Assignment not found');
      }
      return assignment;
    } catch (error) {
      _logger.error('[PatientDoctorAssignmentService]::Error fetching assignment', error);
      throw error;
    }
  };

  static fetchDoctorsByPatient = async (patientId: number) => {
    try {
      const doctors = await PatientDoctorAssignmentRepository.fetchDoctorsByPatient(patientId);
      if (!doctors || doctors.length === 0) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'No doctors found for this patient');
      }
      return doctors;
    } catch (error) {
      _logger.error('[PatientDoctorAssignmentService]::Error fetching doctors by patient', error);
      throw error;
    }
  };
  static fetchAllAssignments = async () => {
    try {
      const assignments = await PatientDoctorAssignmentRepository.fetchAllAssignments();
      if (!assignments || assignments.length === 0) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'No assignments found');
      }
      return assignments;
    } catch (error) {
      _logger.error('[PatientDoctorAssignmentService]::Error fetching all assignments', error);
      throw error;
    }
  };

  static fetchPatientsByDoctor = async (doctorId: number) => {
    try {
      const patients = await PatientDoctorAssignmentRepository.fetchAssignmentsByDoctor(doctorId);
      if (!patients || patients.length === 0) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'No patients found for this doctor');
      }
      return patients;
    } catch (error) {
      _logger.error('[PatientDoctorAssignmentService]::Error fetching patients by doctor', error);
      throw error;
    }
  };

  static unassignDoctorFromPatient = async (patientId: number, doctorId: number) => {
    try {
      const unassigned = await PatientDoctorAssignmentRepository.unassignDoctorFromPatient(patientId, doctorId);
      if (!unassigned) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Doctor-patient assignment not found or could not be removed');
      }
      return unassigned;
    } catch (error) {
      _logger.error('[PatientDoctorAssignmentService]::Error unassigning doctor from patient', error);
      throw error;
    }
  };
}
