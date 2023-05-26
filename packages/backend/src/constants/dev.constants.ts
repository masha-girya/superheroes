import * as dotenv from 'dotenv';

dotenv.config();

export const DEV_CONSTANTS = {
  PORT_DEV: process.env.DEV_PORT,
} as const;
