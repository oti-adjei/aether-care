import express from 'express';
import  UsersController  from './user.controller';
import { ValidationMiddleware } from '../../../shared/validators/middleware';
import { fetchUserSchema, fetchUserByEmailSchema, createUserSchema, updateUserSchema, deleteUserSchema } from './validation';
import { tryCatch } from '../../../shared/helpers/try.catch.helper';
// import {getUserverifyToken } from "./middleware/verifytoken";

const router = express.Router();

const { validateRequest } = ValidationMiddleware;

router.get(
  '/:user_id',
  validateRequest(fetchUserSchema),
  tryCatch(UsersController.fetchUserById),
);

router.get(
  '/all/users',
  tryCatch(UsersController.fetchAllUsers),
);

router.get(
  '/email/:email',
  validateRequest(fetchUserByEmailSchema),
  tryCatch(UsersController.fetchUserByEmail),
);

router.post(
  '/users',
  validateRequest(createUserSchema),
  tryCatch(UsersController.createUser),
);

router.put(
  '/:user_id',
  validateRequest(updateUserSchema),
  tryCatch(UsersController.updateUser),
);

router.delete(
  '/:user_id',
  validateRequest(deleteUserSchema),
  tryCatch(UsersController.deleteUser),
);

export const userRouter = router;
