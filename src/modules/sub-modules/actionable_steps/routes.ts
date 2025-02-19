import express from 'express';
import { ValidationMiddleware } from '../../../shared/validators/middleware';
import { createActionableStepSchema, deleteActionableStepSchema, fetchActionableStepByIdSchema, updateActionableStepSchema } from './validation';
import { tryCatch } from '../../../shared/helpers/try.catch.helper';
import {getUserverifyToken } from "../../../shared/helpers/verifytoken";
import { ActionableStepsController } from './actionableSteps.controller';

const router = express.Router();

const { validateRequest } = ValidationMiddleware;

router.get(
  '/:id',
  validateRequest(fetchActionableStepByIdSchema),
  tryCatch(ActionableStepsController.fetchAllActionableSteps),
);

router.get(
  '/all',
  tryCatch(ActionableStepsController.fetchAllActionableSteps),
);

// router.get(
//   '/deleted',
//   tryCatch(ActionableStepsController.fetchDeletedActionableSteps),
// );

// router.get(
//   '/deleted/:patient_id',
//   tryCatch(ActionableStepsController.fetchDeletedDoctorNotesByPatient),
// );

// router.get(
//   '/all/:patient_id',
//   tryCatch(ActionableStepsController.fetchAllDoctorNotesByPatient),
// );

// router.get(
//   '/all/:patient_id/:doctor_id',
//   tryCatch(ActionableStepsController.fetchAllDoctorNotesByPatientAndDoctor),
// );

// router.get(
//   '/all/:patient_id/:doctor_id/:date',
//   tryCatch(ActionableStepsController.fetchAllDoctorNotesByPatientAndDoctorAndDate),
// );

router.post(
  '/',
  // getUserverifyToken,
  validateRequest(createActionableStepSchema),
  tryCatch(ActionableStepsController.createActionableStep),
);

router.put(
  '/:id',
  getUserverifyToken,
  validateRequest(updateActionableStepSchema),
  tryCatch(ActionableStepsController.updateActionableStep),
);

router.delete(
  '/:id',
  getUserverifyToken,
  validateRequest(deleteActionableStepSchema),
  tryCatch(ActionableStepsController.deleteActionableStep),
);

export const actionableStepsRouter = router;