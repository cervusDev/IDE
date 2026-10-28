import { z } from 'zod';

export const createUserControllerBody = z.object({
  name: z
    .string({ error: 'O nome é obrigatório' })
    .trim()
    .min(3, { message: 'O nome deve ter pelo menos 3 caracteres' })
    .max(100, { message: 'O nome deve ter no máximo 100 caracteres' }),
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

export type CreateUserControllerBody = z.infer<typeof createUserControllerBody>;
