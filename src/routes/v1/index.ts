import express from 'express';
import { userRouter } from '../../modules/users/user/routes';



const appRouter = express.Router();

appRouter.use('/user', userRouter);


export const Router = appRouter;
