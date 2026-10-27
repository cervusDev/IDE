import 'dotenv/config';
import { z } from 'zod';
import { EEnvironment } from './enums';

const envSchema = z.object({
  NODE_ENV: z.enum([
    EEnvironment.DEVELOPMENT,
    EEnvironment.PRODUCTION,
    EEnvironment.TESTING,
  ]),
  PORT: z.string(),
});

export const envConfig = envSchema.parse(process.env);
