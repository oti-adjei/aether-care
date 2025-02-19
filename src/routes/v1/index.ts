import express from 'express';
import { userRouter } from '../../modules/users/user/routes';
import { doctorRouter } from '../../modules/users/doctor/routes';
import { adminRouter } from '../../modules/users/admin/routes';
import { patientRouter } from '../../modules/users/patients/routes';
import { actionableStepsRouter } from '../../modules/sub-modules/actionable_steps/routes';
import { doctorNoteRouter } from '../../modules/sub-modules/doctor_note/routes';
import { medicalHistoryRouter } from '../../modules/sub-modules/medical_history/routes';
import { assignmentsRouter } from '../../modules/sub-modules/patient_doctor_asign/routes';
import { visitLogsRouter } from '../../modules/visit_log/routes';



const appRouter = express.Router();

appRouter.use('/user', userRouter);
appRouter.use('/doctors', doctorRouter);
appRouter.use('/admin', adminRouter);
appRouter.use('/patients', patientRouter);
appRouter.use('/doctor-note', doctorNoteRouter);
appRouter.use('/medical-history', medicalHistoryRouter);
appRouter.use('/assignments', assignmentsRouter);
appRouter.use('/visit_logs', visitLogsRouter);
appRouter.use('/actionable-steps', actionableStepsRouter);


export const Router = appRouter;
