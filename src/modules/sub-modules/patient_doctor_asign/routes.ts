import express from 'express';
import { ValidationMiddleware } from '../../../shared/validators/middleware';
import { createPatientDoctorAssignmentSchema, deletePatientDoctorAssignmentSchema, fetchPatientDoctorAssignmentByIdSchema } from './validation';
import { tryCatch } from '../../../shared/helpers/try.catch.helper';
// import {getUserverifyToken } from "../../../shared/helpers/verifytoken";
import { PatientDoctorAssignmentController } from './patientDoctorAssign.controller';

const router = express.Router();

const { validateRequest } = ValidationMiddleware;

router.get(
  '/:id',
  validateRequest(fetchPatientDoctorAssignmentByIdSchema),
  tryCatch(PatientDoctorAssignmentController.fetchAssignment),
);

router.get(
  '/all',
  tryCatch(PatientDoctorAssignmentController.fetchAllAssignments),
);

// router.get(
//   '/deleted',
//   tryCatch(PatientDoctorAssignmentController.fetchDeletedPatientDoctorAssignment),
// );

// router.get(
//   '/deleted/:patient_id',
//   tryCatch(PatientDoctorAssignmentController.fetchDeletedPatientDoctorAssignmentByPatient),
// );

// router.get(
//   '/all/:patient_id',
//   tryCatch(PatientDoctorAssignmentController.fetchAllPatientDoctorAssignmentByPatient),
// );

// router.get(
//   '/all/:patient_id/:doctor_id',
//   tryCatch(PatientDoctorAssignmentController.fetchAllPatientDoctorAssignmentByPatientAndDoctor),
// );

// router.get(
//   '/all/:patient_id/:doctor_id/:date',
//   tryCatch(PatientDoctorAssignmentController.fetchAllPatientDoctorAssignmentByPatientAndDoctorAndDate),
// );

//TODO: Test with verify token later

router.post(
  '/',
  // getUserverifyToken,
  validateRequest(createPatientDoctorAssignmentSchema),
  tryCatch(PatientDoctorAssignmentController.assignDoctor),
);

// router.put(
//   '/:id',
//   getUserverifyToken,
//   validateRequest(updatePatientDoctorAssignmentSchema),
//   tryCatch(PatientDoctorAssignmentController.),
// );

router.delete(
  '/:id',
  // getUserverifyToken,
  validateRequest(deletePatientDoctorAssignmentSchema),
  tryCatch(PatientDoctorAssignmentController.unassignDoctor),
);

export const assignmentsRouter = router;