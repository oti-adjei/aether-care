import { ResponseHandler } from '../../shared/helpers/response.handler';
import { Request, Response } from 'express';
import Logger from '../../config/logger';
import { UserService } from '../users/user/service';
import { StatusCodes } from 'http-status-codes';
import { SendPhoneNumberOtpValidator, VerifyPhoneNumberOtpValidator } from './validation';
import { TotpHelper } from '../../shared/helpers/totpHelper';
import { AuthService } from './service';

const _logger = new Logger('UserController');

export class AuthController {

  static signup = async (req: Request, res: Response) => {
    try {
      _logger.log('[UserController]::Logging in user');
      const payload = req.body;

      const user = await UserService.createUser(payload) ;

   

      const response = new ResponseHandler(req, res);
      response.success({
        message: 'User logged in successfully',
        code: StatusCodes.OK,
        data: user,
      });
    } catch (error) {
      _logger.error(
        '[UserController]::Something went wrong while logging in',
        error,
      );
      throw error;
    }
  }; 

  static login = async (req: Request, res: Response) => {
    try {
      _logger.log('[UserController]::Logging in user');
      const payload = req.body;
      const { token } = payload; // OTP entered by the user (if required)
  
      // Step 1: Authenticate the user (Check email & password)
      const user = await AuthService.login(payload);
  
      // Step 2: If user is a doctor, check if they have TOTP set up
      if (user.type === 'doctor') {
        const userTotpSecret = await AuthService.getTotpSecret(user.id);
  
        if (!userTotpSecret) {
          // Step 3: First-time setup → Generate QR code for the user
          const { secret, otpauthUrl } = TotpHelper.generateTotpSecret();
  
          // Save the secret key in the database
          await AuthService.saveTotpSecret(user.id, secret);
  
          // Generate the QR Code image
          let qrCode;
          if(otpauthUrl){
           qrCode = await TotpHelper.generateTotpQrCode(otpauthUrl);
          }
  
          return res.status(StatusCodes.OK).json({
            message: 'TOTP setup required. Scan the QR code to enable 2FA.',
            qrCode, // Send the QR code so the doctor can scan it
          });
        }
  
        // Step 4: If TOTP is already set up, verify the OTP token
        if (!token) {
          return res.status(StatusCodes.UNAUTHORIZED).json({
            message: 'OTP required for login',
          });
        }
  
        const isTokenValid = TotpHelper.verifyTotp(token, userTotpSecret);
  
        if (!isTokenValid) {
          return res.status(StatusCodes.UNAUTHORIZED).json({
            message: 'Invalid OTP. Try again.',
          });
        }
      }
  
      // Step 5: If login is successful, return user data
      const response = new ResponseHandler(req, res);
      return response.success({
        message: 'User logged in successfully',
        code: StatusCodes.OK,
        data: user,
      });
    } catch (error) {
      _logger.error(
        '[UserController]::Something went wrong while logging in',
        error
      );
      throw error;
      return;
    }
  };

  static sendPhoneNumberOtp = async (req: Request, res: Response) => {
    try {
      _logger.log('[UserController]::Sending phone number otp');
      const payload = req.body as SendPhoneNumberOtpValidator;
      // const type = payload.type;
        const otp = await AuthService.sendPhoneNumberOtp(payload);

      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Phone number otp sent successfully',
        code: StatusCodes.OK,
        data: otp,
      });
    } catch (err) {
      _logger.error(
        '[UserController]::Something went wrong when sending phone number otp',
        err,
      );
      throw err;
    }8
  };

  static verifyPhoneNumberOtp = async (req: Request, res: Response) => {
    try {
      _logger.log('[UserController]::Verifying phone number otp');
      const payload = req.body as VerifyPhoneNumberOtpValidator;
      const userId = (req as any).userId;
      // const type = payload.type;
      const user  = await AuthService.verifyPhoneNumberOtp(payload,userId);
      

      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Phone number verified successfully',
        code: StatusCodes.OK,
        data: user,
      });
    } catch (err) {
      _logger.error(
        '[UserController]::Something went wrong when verifying phone number otp',
        err,
      );
      throw err;
    }
  };

  /* static login = async (req: Request, res: Response) => {
    try {
      _logger.log('[UserController]::Logging in user');
      const payload = req.body;

      const user = await UserService.login(payload) ;

    //   checks user type in user and then if doctor then does totp thing bt calling the generate

      const response = new ResponseHandler(req, res);
      response.success({
        message: 'User logged in successfully',
        code: StatusCodes.OK,
        data: user,
      });
    } catch (error) {
      _logger.error(
        '[UserController]::Something went wrong while logging in',
        error,
      );
      throw error;
    }
  }; */

}


