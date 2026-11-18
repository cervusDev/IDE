import { z } from 'zod';

export const listScreeningByRegistrationControllerQuerySchema = z.object({
  registration: z.string(),
});

export type ListScreeningByRegistrationControllerQuerySchema = z.infer<
  typeof listScreeningByRegistrationControllerQuerySchema
>;

export const listScreeningByRegistrationControllerResponseSchema = z.object({
  list: z.array(
    z.object({
      id: z.string(),
      version: z.number(),
      is_latest: z.boolean(),
    }),
  ),
});

export type ListScreeningByRegistrationControllerResponseSchema = z.infer<
  typeof listScreeningByRegistrationControllerResponseSchema
>;
