import express from 'express';
import { userRouter } from '../../modules/users/user/routes';
import { doctorRouter } from '../../modules/users/doctor/routes';



const appRouter = express.Router();

appRouter.use('/user', userRouter);
appRouter.use('/doctors', doctorRouter);


export const Router = appRouter;
