import { configDotenv } from 'dotenv';
import development from './development';
import test from './test';

configDotenv();

const defaults = {
  AETHERCARE_NODE_ENV: process.env.AETHERCARE_NODE_ENV,
  AETHERCARE_PORT: process.env.AETHERCARE_PORT,
  AETHERCARE_DATABASE_URL: process.env.AETHERCARE_DATABASE_URL,
  APP_NAME: process.env.APP_NAME,
  AETHERCARE_DOMAIN: process.env.AETHERCARE_DOMAIN,
  AETHERCARE_SALT_ROUNDS: parseInt(process.env.AETHERCARE_SALT_ROUNDS as string),
  AETHERCARE_SECRET: process.env.AETHERCARE_SECRET,
};

export default {
  development: { ...defaults, ...development },
  test: { ...defaults, ...test },
}[process.env.AETHERCARE_NODE_ENV || 'development'];
