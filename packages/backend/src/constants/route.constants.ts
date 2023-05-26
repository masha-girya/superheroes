import * as dotenv from 'dotenv';

dotenv.config();

export const ROUTE_CONSTANTS = {
  SUPERHEROES: 'superheroes',
  PAGINATION: 'pagination',
  NICKNAME: ':nickname',
  ID: ':id',
} as const;
