import express from 'express';
import { ValidationMiddleware } from '../../../shared/validators/middleware';
import { createAdminSchema, fetchAdminByEmailSchema, fetchAdminByIdSchema, updateAdminIdSchema, deleteAdminSchema, updateAdminSchema, } from './validation';
import { tryCatch } from '../../../shared/helpers/try.catch.helper';
// import {getUserverifyToken } from "./middleware/verifytoken";
import { AdminController } from './admin.controller';

const router = express.Router();

const { validateRequest } = ValidationMiddleware;


router.get(
  '/all/users',
  tryCatch(AdminController.fetchAllAdmins),
);



router.post(
  '/users',
  validateRequest(createAdminSchema),
  tryCatch(AdminController.createAdmin),
);

router.get(
  '/email/:email',
  validateRequest(fetchAdminByEmailSchema),
  tryCatch(AdminController.fetchAdminByEmail),
);

router.get(
  '/:id',
  validateRequest(fetchAdminByIdSchema),
  tryCatch(AdminController.fetchAdmin),
);

router.put(
  '/:id',
  validateRequest(updateAdminSchema),
  tryCatch(AdminController.updateAdmin),
);

router.delete(
  '/:id',
  validateRequest(deleteAdminSchema),
  tryCatch(AdminController.deleteAdmin),
);


export const userRouter = router;
