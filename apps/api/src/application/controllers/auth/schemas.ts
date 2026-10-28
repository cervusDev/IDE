import { z } from 'zod';

export const authControllerBody = z.object({
  email: z.email({ message: 'O e-mail informado é inválido' }),
  password: z
    .string({ error: 'A senha é obrigatória' })
    .min(8, { message: 'A senha deve ter pelo menos 8 caracteres' })
    .max(72, { message: 'A senha deve ter no máximo 72 caracteres' })
    .regex(/[A-Z]/, {
      message: 'A senha deve conter pelo menos uma letra maiúscula',
    })
    .regex(/[a-z]/, {
      message: 'A senha deve conter pelo menos uma letra minúscula',
    })
    .regex(/[0-9]/, {
      message: 'A senha deve conter pelo menos um número',
    })
    .regex(/[^A-Za-z0-9]/, {
      message: 'A senha deve conter pelo menos um caractere especial',
    }),
});

export type AuthControllerBody = z.infer<typeof authControllerBody>;

export const authControllerResponse = z.object({
  token: z.string(),
});

export type AuthControllerResponse = z.infer<typeof authControllerResponse>;
