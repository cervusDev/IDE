import { z } from 'zod';

export const deleteScreeningControllerQuerySchema = z.object({
  registration: z.string(),
});

export type DeleteScreeningControllerQuerySchema = z.infer<
  typeof deleteScreeningControllerQuerySchema
>;
