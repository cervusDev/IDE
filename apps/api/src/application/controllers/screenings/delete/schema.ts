import { z } from 'zod';

export const deleteScreeningControllerParamsSchema = z.object({
  registration: z.string(),
});

export type DeleteScreeningControllerParamsSchema = z.infer<
  typeof deleteScreeningControllerParamsSchema
>;
