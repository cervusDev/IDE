import { z } from 'zod';

export const listUserControllerResponse = z.object({
  list: z.array(z.object({
    name: z.string(),
    email: z.email(),
    id: z.string(),
    is_active: z.boolean(),
  }))
});

export type ListUserControllerResponse = z.infer<typeof listUserControllerResponse>;
