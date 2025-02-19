import Logger from '../../config/logger';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Env from '../utils/env';
import { ApiError } from '../utils/api.error';
import { StatusCodes } from 'http-status-codes';


interface DecodedToken {
    id: string;
    iat: number;
    exp: number;
}

const _logger = new Logger("Middleware");

//TODO : Need to add error handling for if no authorization. Request hangs forever

export const getUserverifyToken = async (req: Request, _res: Response, next: NextFunction): Promise<any> => {
    const token = req.headers['authorization']?.split(' ')[1];
    console.log(token);

    if (!token) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'No authorization');
    }

    try {
        const decoded = jwt.verify(token, Env.get('AETHERCARE_SECRET')) as DecodedToken;
        (req as any).userId = decoded.id;
        next();
    } catch (error) {
        _logger.error(
            '[Middleware]::Something went wrong getting user_id from token',
            error,
          );
          throw new ApiError(StatusCodes.NOT_FOUND, 'No authorization', error);
    }
};

