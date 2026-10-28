import { envConfig } from '@config/env';

interface IDatabaseEnv {
  url: string;
}

export const databaseEnv: IDatabaseEnv = {
  url: envConfig.DATABASE_URL,
};
