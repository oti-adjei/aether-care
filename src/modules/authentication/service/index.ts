import { ApiError } from '../../../shared/utils/api.error';
import Logger from '../../../config/logger';
import { AuthRepository } from '../repository';
import { StatusCodes } from 'http-status-codes';


const _logger = new Logger('AuthService');
export class AuthService {

    static async getTotpSecret(userId: number): Promise<string | null> {
        return await AuthRepository.getTotpSecret(userId);
      }
    
      static async saveTotpSecret(userId: number, secret: string): Promise<void> {
        return await AuthRepository.saveTotpSecret(userId, secret);
      }

}