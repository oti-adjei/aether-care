import express from 'express';
import { ValidationMiddleware } from '../../../shared/validators/middleware';
import { createDoctorNoteSchema, fetchDoctorNoteByIdSchema, softDeleteDoctorNoteSchema, updateDoctorNoteSchema, } from './validation';
import { tryCatch } from '../../../shared/helpers/try.catch.helper';
import {getUserverifyToken } from "../../../shared/helpers/verifytoken";
import { DoctorNotesController } from './doctorNote.controller';

const router = express.Router();

const { validateRequest } = ValidationMiddleware;

router.get(
  '/:id',
  validateRequest(fetchDoctorNoteByIdSchema),
  tryCatch(DoctorNotesController.fetchDoctorNote),
);

router.get(
  '/all',
  tryCatch(DoctorNotesController.fetchAllDoctorNotes),
);

router.get(
  '/deleted',
  tryCatch(DoctorNotesController.fetchDeletedDoctorNotes),
);

router.get(
  '/deleted/:patient_id',
  tryCatch(DoctorNotesController.fetchDeletedDoctorNotesByPatient),
);

// router.get(
//   '/all/:patient_id',
//   tryCatch(DoctorNotesController.fetchAllDoctorNotesByPatient),
// );

// router.get(
//   '/all/:patient_id/:doctor_id',
//   tryCatch(DoctorNotesController.fetchAllDoctorNotesByPatientAndDoctor),
// );

// router.get(
//   '/all/:patient_id/:doctor_id/:date',
//   tryCatch(DoctorNotesController.fetchAllDoctorNotesByPatientAndDoctorAndDate),
// );

router.post(
  '/',
  // getUserverifyToken,
  validateRequest(createDoctorNoteSchema),
  tryCatch(DoctorNotesController.createDoctorNote),
);

router.put(
  '/:id',
  getUserverifyToken,
  validateRequest(updateDoctorNoteSchema),
  tryCatch(DoctorNotesController.updateDoctorNote),
);

router.delete(
  '/:id',
  getUserverifyToken,
  validateRequest(softDeleteDoctorNoteSchema),
  tryCatch(DoctorNotesController.deleteDoctorNote),
);

export const doctorNoteRouter = router;