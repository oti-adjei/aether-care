import { ApiError } from '../../../shared/utils/api.error';
import Logger from '../../../config/logger';
import { StatusCodes } from 'http-status-codes';
import { sqlQuest } from '../../../config/database';
import { authQueries } from '../queries';


const _logger = new Logger('AuthRepository');

export class AuthRepository {

    static async getTotpSecret(userId: number): Promise<string | null> {
        const result = await sqlQuest.one(authQueries.getTotpSecret, [userId]);
        return result.rows.length ? result.rows[0].totp_secret : null;
      }
    
      static async saveTotpSecret(userId: number, secret: string): Promise<void> {
        await sqlQuest.one(authQueries.saveTotpSecret, [secret, userId]);
      }

}