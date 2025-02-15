import { ApiError } from '../../../shared/utils/api.error';
import Logger from '../../../config/logger';
import { AuthRepository } from '../repository';
import { StatusCodes } from 'http-status-codes';
import { UserRepository } from 'src/modules/users/user/repository';
import { GenericHelper } from 'src/shared/helpers/generic.helper';
import Env from 'src/shared/utils/env';
import { LoginValidator, SendPhoneNumberOtpValidator, VerifyPhoneNumberOtpValidator } from '../validation';
import * as jwt from 'jsonwebtoken';


const _logger = new Logger('AuthService');
export class AuthService {

    static async getTotpSecret(userId: number): Promise<string | null> {
      try{
       const secret =  await AuthRepository.getTotpSecret(userId);
       if(!secret){
        throw new ApiError(StatusCodes.NOT_FOUND, 'No totp secret found');
       }
       return secret;
      } catch (error) {
        _logger.error('[AuthService]::Error fetching totp secret', error);
        throw error;
      }
    }
    
      static async saveTotpSecret(userId: number, secret: string){
        try{
          const result = await AuthRepository.saveTotpSecret(userId, secret);
          if(!result){
            throw new ApiError(StatusCodes.NOT_FOUND, 'No totp secret found');
          }
          return result;
        } catch (error) {
          _logger.error('[AuthService]::Error saving totp secret', error);
          throw error;
        }
      }

      static login = async (request: LoginValidator): Promise<any> => {
        try {
          const { email, password } = request;
    
          const user = await UserRepository.fetchUserByEmail(email);
    
          if (!user) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
          }
    
          const isPasswordValid = await GenericHelper.compareHash(
            password,
            user.password as string,
          );
          if (!isPasswordValid) {
            throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid password');
          }
    
          const token = jwt.sign(
            {
              id: user.id,
              email: user.email,
              name: user.name,
            },
            Env.get('ENVOYER_SECRET') as string,
            { expiresIn: '1d', algorithm: 'HS256' },
          );
    
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { password: _, ...userDetails } = user;
          return { ...userDetails, token };
        } catch (err) {
          _logger.error('[UserService]::Something went wrong when logging in');
          throw err;
        }
      };

      static sendPhoneNumberOtp = async (
        request: SendPhoneNumberOtpValidator,
      ): Promise<any> => {
        try {
          const { mobile_number,type } = request;
    
          const user = await AuthRepository.getUserByPhoneNumber(mobile_number);
          if (!user) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
          }
    
          const otp = GenericHelper.generateRandomNumber(6);
    
          const hashedOtp = GenericHelper.hashOtp(
            otp,
            Env.get('ENVOYER_SECRET'),
            
          );
          console.log("========hashed otp no nie",hashedOtp);
          await AuthRepository.upadteOtp(user.id, hashedOtp,type);
          /* use arkesell to send otp
          // SEND SMS
    
          // await axios.get('https://sms.arkesel.com/sms/api?action=send-sms&api_key=cWx4eXdzd1NEcEZMRklrVG9LYUM=&to=233542160623&from=Arkesel&sms=Hello world. Spreading peace and joy only. Remeber to put on your face mask. Stay safe!')
          // .then((response: any) => console.log(response))
          // .catch((error: any) => console.log(error));
    
          const data = {
            "sender": "Envoyer GH",
            "message": "Welcome to Envoyer Ghana. Please enjoy the experience. Your OTP is " + otp,
            "recipients": ["233542160623"]
          };
    
          const config = {
            method: 'post',
            url: 'https://sms.arkesel.com/api/v2/sms/send',
            headers: {
              'api-key': 'ZmFLQlloZkp1UXBlR2FSR3JwSmE'
            },
            data: data
          };
    
          await axios(config)
            .then(function (response: { data: any; }) {
              console.log(JSON.stringify(response.data));
            })
            .catch(function (error: any) {
              console.log(error);
            }); */
    
           await GenericHelper.sendSMS(mobile_number, otp);
    
          return { otp, id: user.id };
        } catch (error) {
          _logger.error(
            '[UserService]::Something went wrong when sending phone number otp',
          );
          throw error;
        }
      };
    
      static verifyPhoneNumberOtp = async (
        request: VerifyPhoneNumberOtpValidator,
        userId?: number,
      ): Promise<any> => {
    
        try {
          const { otp,type } = request;
          console.log(otp);
    
          const verifiedStatus = await AuthRepository.checkIfVerified(userId)
    
          if(verifiedStatus.is_verified === true){
            throw new ApiError(StatusCodes.BAD_REQUEST, 'User already verified');
          }
    
          console.log("======== verified status",verifiedStatus);
    
          // const isOtpValid =  await GenericHelper.verifyOtp(
         await GenericHelper.verifyOtp(
            otp,
            Env.get('ENVOYER_SECRET'),
            userId,
            type
          );
    
          const isVerified = AuthRepository.setIsVerified(userId)
    
          if(!isVerified){
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Couldnt set is verified');
          }
          return "User Veified successfully";
        } catch (err) {
          _logger.error(
            '[UserService]::Something went wrong when verifying phone number otp',
          );
          throw err;
        }
      };

}