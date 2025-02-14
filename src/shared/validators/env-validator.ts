import { z } from 'zod';
import { AppEnv } from '../enums';

export interface EnvProps {
  PORT: number;
  AETHERCARE_NODE_ENV: string;
  AETHERCARE_DATABASE_URL: string;
  APP_NAME: string;
  AETHERCARE_SALT_ROUNDS: number;
  AETHERCARE_SECRET: string;
  AETHERCARE_DOMAIN: string;
}

export const envValidatorSchema = z.object({
  PORT: z.string().default('8000'),
  AETHERCARE_NODE_ENV: z.string().default(AppEnv.DEVELOPMENT),

  AETHERCARE_DATABASE_URL: z.string(),

  APP_NAME: z.string(),

  AETHERCARE_SALT_ROUNDS: z.number(),

  AETHERCARE_SECRET: z.string(),

  AETHERCARE_DOMAIN: z.string(),
});
