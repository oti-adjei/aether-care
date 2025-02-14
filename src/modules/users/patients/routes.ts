import express from 'express';
import { PatientController } from './patient.controller';
import { ValidationMiddleware } from '../../../shared/validators/middleware';
import { fetchPatientByIdSchema, fetchPatientByEmailSchema, createPatientSchema, updatePatientSchema, deletePatientSchema, } from './validation';
import { tryCatch } from '../../../shared/helpers/try.catch.helper';


const router = express.Router();

const { validateRequest } = ValidationMiddleware;

router.get(
  '/:id',
  validateRequest(fetchPatientByIdSchema),
  tryCatch(PatientController.fetchPatient),
);

router.get(
  '/all/users',
  tryCatch(PatientController.fetchAllPatients),
);

router.get(
  '/email/:email',
  validateRequest(fetchPatientByEmailSchema),
  tryCatch(PatientController.fetchPatientByEmail),
);

router.post(
  '/users',
  validateRequest(createPatientSchema),
  tryCatch(PatientController.createPatient),
);

router.put(
  '/:id',
  validateRequest(updatePatientSchema),
  tryCatch(PatientController.updatePatient),
);

router.delete(
  '/:id',
  validateRequest(deletePatientSchema),
  tryCatch(PatientController.deletePatient),
);

export const userRouter = router;
