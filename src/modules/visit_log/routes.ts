import express from 'express';
import { ValidationMiddleware } from '../../shared/validators/middleware';
import { createVisitLogSchema, fetchVisitLogByIdSchema } from './validation';
import { tryCatch } from '../../shared/helpers/try.catch.helper';
import {getUserverifyToken } from "../../shared/helpers/verifytoken";
import { VisitLogController } from './visitLog.controller';

const router = express.Router();

const { validateRequest } = ValidationMiddleware;

router.get(
  '/:id',
  validateRequest(fetchVisitLogByIdSchema),
  tryCatch(VisitLogController.fetchVisitLog),
);

// router.get(
//   '/all',
//   tryCatch(VisitLogController.createVisitLog),
// );

// router.get(
//   '/deleted',
//   tryCatch(VisitLogController.fetchDeletedVitalLogss),
// );

router.get(
  '/deleted/:patient_id',
  tryCatch(VisitLogController.fetchPatientVisits),
);

// router.get(
//   '/all/:patient_id',
//   tryCatch(VisitLogController.fetchAllVitalLogssByPatient),
// );

// router.get(
//   '/all/:patient_id/:doctor_id',
//   tryCatch(VisitLogController.fetchAllVitalLogssByPatientAndDoctor),
// );

// router.get(
//   '/all/:patient_id/:doctor_id/:date',
//   tryCatch(VisitLogController.fetchAllVitalLogssByPatientAndDoctorAndDate),
// );

router.post(
  '/',
  getUserverifyToken,
  validateRequest(createVisitLogSchema),
  tryCatch(VisitLogController.createVisitLog),
);

// router.put(
//   '/:id',
//   getUserverifyToken,
//   validateRequest(updateVitalLogsSchema),
//   tryCatch(VisitLogController.),
// );

// router.delete(
//   '/:id',
//   getUserverifyToken,
//   validateRequest(softDeleteVitalLogsSchema),
//   tryCatch(VisitLogController.deleteVitalLogs),
// );

export const visitLogsRouter = router;