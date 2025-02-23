import { ResponseHandler } from '../../shared/helpers/response.handler';
import { Request, Response } from 'express';
import Logger from '../../config/logger';
// import { UserService } from '../users/user/service';
import { StatusCodes } from 'http-status-codes';
import { SendPhoneNumberOtpValidator, VerifyPhoneNumberOtpValidator } from './validation';
import { TotpHelper } from '../../shared/helpers/totpHelper';
import { AuthService } from './service';
import { DoctorService } from '../users/doctor/service';
import { PatientService } from '../users/patients/service';
import { AdminService } from '../users/admin/service';
import speakeasy from "speakeasy";
import * as jwt from 'jsonwebtoken';
import Env from '../../shared/utils/env';

const _logger = new Logger('UserController');

export class AuthController {

  static signup = async (req: Request, res: Response) => {
    try {
      _logger.log('[UserController]::Logging in user');
      const payload = req.body;

      let user;

      //check role in payload to determine type of user
      if (payload.role === 'doctor') {
        user = await DoctorService.createDoctor(payload);
      }
      else if (payload.role === 'patient') {
        user = await PatientService.createPatient(payload);
      }
      else if (payload.role === 'admin') {
        user = await AdminService.createAdmin(payload);
      }  

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
      const response = new ResponseHandler(req, res);
  
      // Step 1: Authenticate the user (Check email & password)
      const user = await AuthService.login(payload);


      if (!user) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: 'Invalid credentials',
        });
      }

      //print out user
      console.log(user);
  
      // Step 2: If user is a doctor, check if they have TOTP set up
      if (user.role === 'doctor') {
        _logger.log('[UserController]::User is a doctor');
        const userTotpSecret = await AuthService.getTotpSecret(user.user_id);

        console.log('userTotpSecret',userTotpSecret);
  
        if (userTotpSecret === null) {
          // Step 3: First-time setup → Generate QR code for the user
          const { secret, otpauthUrl } = TotpHelper.generateTotpSecret();

          //console log secret
          console.log('secret is',secret);
  
          // Save the secret key in the database
          await AuthService.saveTotpSecret(user.user_id, secret);
  
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
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: 'OTP required for login',
          user_id: user.user_id,
        });
      } 

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        Env.get('AETHERCARE_SECRET') as string,
        { expiresIn: '1d', algorithm: 'HS256' },
      );

      //Add token to user
      user.token = token;

  
      // Step 5: If login is successful, return user data
      
      return response.success({
        message: 'User logged in successfully',
        code: StatusCodes.OK,
        data: user,
      });
    } catch (error) {
      _logger.error(
        '[AuthController]::Something went wrong while logging in',
        error
      );
      throw error;
    }
  };

  static verifyTOTP = async (req: Request, res: Response) => {
    try {
      const { user_id } = req.body;
      let { totpCode } = req.body;

      // totpCode = totpCode.trim();
  
      // Fetch user’s stored TOTP secret
      const user = await DoctorService.fetchDoctor(user_id);

      console.log('user is ', user);
      if (!user || !user.totp_secret) {
        return res.status(400).json({ message: "User or TOTP secret not found" });
      }


      console.log('totpCode is ', totpCode);
  
      // Verify TOTP code
      const isValid = speakeasy.totp.verify({
        secret: user.totp_secret,
        encoding: "base32",
        token: totpCode,
        window: 1, // Allows slight time drift
      });

      console.log('isValid is ', isValid);
  
      if (!isValid) {
        return res.status(401).json({ message: "Invalid TOTP code" });
      }
  
      // Generate JWT token upon successful 2FA verification
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        Env.get('AETHERCARE_SECRET') as string,
        { expiresIn: '1d', algorithm: 'HS256' },
      );

      user.token = token;
      const response = new ResponseHandler(req, res);
      return response.success({
        message: 'User logged in successfully',
        code: StatusCodes.OK,
        data: user,
      });
    } catch (error) {
      _logger.error(
        '[AuthController]::Something went wrong while logging in',
        error
      );
      throw error;
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


