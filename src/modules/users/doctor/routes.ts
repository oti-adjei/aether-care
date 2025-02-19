import express from 'express';
import { DoctorController } from './doctor.controller';
import { ValidationMiddleware } from '../../../shared/validators/middleware';
import { createDoctorSchema, deleteDoctorSchema, fetchDoctorByEmailSchema, fetchDoctorSchema, updateDoctorSchema } from './validation';
import { tryCatch } from '../../../shared/helpers/try.catch.helper';

const router = express.Router();

const { validateRequest } = ValidationMiddleware;

router.get(
  '/:id',
  validateRequest(fetchDoctorSchema),
  tryCatch(DoctorController.fetchDoctor),
);

router.get(
  '/all/doctors',
  tryCatch(DoctorController.fetchAllDoctors),
);

router.get(
  '/email/:email',
  validateRequest(fetchDoctorByEmailSchema),
  tryCatch(DoctorController.fetchDoctorByEmail),
);

router.post(
  '/',
  validateRequest(createDoctorSchema),
  tryCatch(DoctorController.createDoctor),
);

router.put(
  '/:id',
  validateRequest(updateDoctorSchema),
  tryCatch(DoctorController.updateDoctor),
);

router.delete(
  '/:doctor_id',
  validateRequest(deleteDoctorSchema),
  tryCatch(DoctorController.deleteDoctor),
);

export const doctorRouter = router;
