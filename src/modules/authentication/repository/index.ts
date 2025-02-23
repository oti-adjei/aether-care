// import { ApiError } from '../../../shared/utils/api.error';
import Logger from '../../../config/logger';
// import { StatusCodes } from 'http-status-codes';
import { sqlQuest } from '../../../config/database';
import { authQueries } from '../queries';


const _logger = new Logger('AuthRepository');

export class AuthRepository {

    static async getTotpSecret(userId: string) {
      try{
        const result = await sqlQuest.oneOrNone(authQueries.getTotpSecret, [userId]);

        console.log('result is ', result);
        console.log('result.rows is ', result.totp_secret);

           // Check if result is defined AND if it has a rows property
 
      return result.totp_secret;

      }catch(error){
        _logger.error('[AuthRepository]::Error fetching totp secret', error);
        throw error;
      }
    }
    
      static async saveTotpSecret(userId: string, secret: string) {
        try{
          console.log('secret and user is ', secret, userId);
       const result = await sqlQuest.oneOrNone(authQueries.saveTotpSecret, [ userId,secret]);

       console.log('result is ', result);

        return result;
      } catch (error) {
        _logger.error('[AuthRepository]::Error saving totp secret', error);
        throw error;
      }
    }

    static getUserByPhoneNumber = async (
      phoneNumber: string,
    ): Promise<any> => {
      try {
        const user = await sqlQuest.oneOrNone(authQueries.getUserByPhoneNumber, [
          phoneNumber,
        ]);
        // delete user.password
        return user;
      } catch (err) {
        _logger.error(
          '[UserRepository]::Something went wrong when getting user by phone number',
          err,
        );
        throw err;
      }
    };
  
    static checkIfUserExists = async (
      email: string,
    ): Promise<any> => {
      try {
        const userExists = await sqlQuest.oneOrNone(
          authQueries.checkIfUserExists,
          [email],
        );
        return userExists;
      } catch (err) {
        _logger.error(
          '[UserRepository]::Something went wrong when checking if user exists',
          err,
        );
        throw err;
      }
    };
    static fetchOtp = async (id: number| undefined, type: string | undefined) => {
      try {
        console.log( "From user repository fetching otp id",id)
        const user = await sqlQuest.oneOrNone(authQueries.fetchOtp, [id,type]);
  
        console.log( "From user repository fetching otp user ========= ",user)
        return user.otp;
        
      } catch (error) {
        _logger.error(
          '[UserRepository]::Something went wrong when fetching user',
          error,
        );
        throw error;
      }
    };
    static checkIfVerified = async (userId: number| undefined) => {
      try {
        const user = await sqlQuest.oneOrNone(authQueries.checkVerified, [userId]);
        console.log( "From user repository user ========= ",user);
        return user;
      } catch (error) {
        _logger.error(
          '[UserRepository]::Something went wrong when cheking verification status',
          error,
        );
        throw error;
      }
    };
    static setIsVerified = async (userId: number | undefined) => {
      try {
        const user = await sqlQuest.oneOrNone(authQueries.updateVerifiedfield, [userId]);
        return user;
      } catch (error) {
        _logger.error(
          '[UserRepository]::Something went wrong when setting verification field',
          error,
        );
        throw error;
      }
    };
  
    static storeOtp = async (userId: string, otp: string): Promise<void> => {
      try {
        await sqlQuest.none(authQueries.storeOtp, [userId, otp]);
        return;
      } catch (err) {
        _logger.error(
          '[UserRepository]::Something went wrong when storing otp',
          err,
        );
        throw err;
      }
    };
    static upadteOtp = async (userId: string, otp: string,type:string): Promise<void> => {
      try {
        await sqlQuest.none(authQueries.updateOtp, [otp, userId, type]);
        return;
      } catch (err) {
        _logger.error(
          '[UserRepository]::Something went wrong when updating otp',
          err,
        );
        throw err;
      }
    };

}