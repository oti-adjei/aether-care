import express from 'express';
import { ValidationMiddleware } from '../../../shared/validators/middleware';
import {  createMedicalHistorySchema, deleteMedicalHistorySchema,fetchMedicalHistoryByIdSchema,updateMedicalHistorySchema, } from './validation';
import { tryCatch } from '../../../shared/helpers/try.catch.helper';
// import {getUserverifyToken } from "../../../shared/helpers/verifytoken";
import { MedicalHistoryController } from './medicalHistory.controller';

const router = express.Router();

const { validateRequest } = ValidationMiddleware;

router.get(
  '/:history_id',
  validateRequest(fetchMedicalHistoryByIdSchema),
  tryCatch(MedicalHistoryController.fetchMedicalHistory
  ),
);

router.get(
  '/all',
  tryCatch(MedicalHistoryController.fetchAllMedicalHistories),
);

// router.get(
//   '/deleted',
//   tryCatch(MedicalHistoryController.fetchDeletedMedicalHi),
// );

// router.get(
//   '/deleted/:patient_id',
//   tryCatch(MedicalHistoryController.fetchDeletedDoctorNotesByPatient),
// );

// router.get(
//   '/all/:patient_id',
//   tryCatch(MedicalHistoryController.fetchAllDoctorNotesByPatient),
// );

// router.get(
//   '/all/:patient_id/:doctor_id',
//   tryCatch(MedicalHistoryController.fetchAllDoctorNotesByPatientAndDoctor),
// );

// router.get(
//   '/all/:patient_id/:doctor_id/:date',
//   tryCatch(MedicalHistoryController.fetchAllDoctorNotesByPatientAndDoctorAndDate),
// );

router.post(
  '/',
  // getUserverifyToken,
  validateRequest(createMedicalHistorySchema),
  tryCatch(MedicalHistoryController.createMedicalHistory),
);

router.put(
  '/:id',
  // getUserverifyToken,
  validateRequest(updateMedicalHistorySchema),
  tryCatch(MedicalHistoryController.updateMedicalHistory),
);

router.delete(
  '/:history_id',
  // getUserverifyToken,
  validateRequest(deleteMedicalHistorySchema),
  tryCatch(MedicalHistoryController.deleteMedicalHistory),
);

export const medicalHistoryRouter = router;