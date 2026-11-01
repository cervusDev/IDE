import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.url(),
  NODE_ENV: z.enum(['development', 'production', 'test', 'homolog']).default('development'),
});

const _env = envSchema.safeParse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NODE_ENV: process.env.NODE_ENV,
});

if (!_env.success) {
  console.error('❌ Erro crítico nas variáveis de ambiente:', JSON.stringify(_env.error.format(), null, 2));
  throw new Error('Variáveis de ambiente inválidas ou ausentes.');
}

export const env = _env.data;