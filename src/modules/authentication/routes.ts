import express from 'express';
import { ValidationMiddleware } from '../../shared/validators/middleware';
import { loginValidator, sendPhoneNumberOtpValidator, verifyPhoneNumberOtpValidator, } from './validation';
import { tryCatch } from '../../shared/helpers/try.catch.helper';
import {getUserverifyToken } from "./middleware/verifytoken";
import { AuthController } from './authentication.controller';

const router = express.Router();

const { validateRequest } = ValidationMiddleware;

router.post(
  '/register',
  validateRequest(loginValidator),
  tryCatch(AuthController.signup),
);

router.post(
  '/send/phone-number-otp',
  validateRequest(sendPhoneNumberOtpValidator),
  tryCatch(AuthController.sendPhoneNumberOtp),
);

router.post(
  '/send/verify-otp',
  getUserverifyToken,
  validateRequest(verifyPhoneNumberOtpValidator),
  tryCatch(AuthController.verifyPhoneNumberOtp),
);

router.post(
  '/login',
  validateRequest(loginValidator),
  tryCatch(AuthController.login),
);

export const authenticationRouter = router;