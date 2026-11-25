import { z } from 'zod';

export const countScreeningControllerResponseSchema = z.object({
  count: z.number()
});

export type CountScreeningControllerResponseSchema = z.infer<
  typeof countScreeningControllerResponseSchema
>;
