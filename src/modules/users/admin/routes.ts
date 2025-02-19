import express from 'express';
import { ValidationMiddleware } from '../../../shared/validators/middleware';
import { createAdminSchema, fetchAdminByEmailSchema, fetchAdminByIdSchema,deleteAdminSchema, updateAdminSchema, } from './validation';
import { tryCatch } from '../../../shared/helpers/try.catch.helper';
// import {getUserverifyToken } from "./middleware/verifytoken";
import { AdminController } from './admin.controller';

const router = express.Router();

const { validateRequest } = ValidationMiddleware;


router.get(
  '/all/',
  tryCatch(AdminController.fetchAllAdmins),
);

router.post(
  '/',
  validateRequest(createAdminSchema),
  tryCatch(AdminController.createAdmin),
);

router.get(
  '/email/:email',
  validateRequest(fetchAdminByEmailSchema),
  tryCatch(AdminController.fetchAdminByEmail),
);

router.get(
  '/:admin_id',
  validateRequest(fetchAdminByIdSchema),
  tryCatch(AdminController.fetchAdmin),
);

router.put(
  '/:admin_id',
  validateRequest(updateAdminSchema),
  tryCatch(AdminController.updateAdmin),
);

router.delete(
  '/:admin_id',
  validateRequest(deleteAdminSchema),
  tryCatch(AdminController.deleteAdmin),
);


export const adminRouter = router;
