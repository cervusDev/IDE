import { PaginationSchemaValues } from '@shared/interfaces/IPagination';
import { z } from 'zod';

export const listScreeningControllerQuerySchema = z.object({
  health_unity: z.string().optional(),
  nis: z.string().optional(),
  registration: z.string().optional(),
  student_name: z.string().optional(),
  student_age: z.string().optional(),
  ra: z.string().optional(),
  page: z.string(),
  limit: z.string().optional()
});

export type ListScreeningControllerQuerySchema = z.infer<
  typeof listScreeningControllerQuerySchema
>;

export const listScreeningControllerResponseSchema = z.object({
  list: z.array(
    z.object({
      student_name: z.string(),
      student_age: z.number(),
      health_unity: z.string(),
      registration: z.string(),
      legal_guardian_name: z.string(),
    }),
  ),
  pagination: PaginationSchemaValues
});

export type ListScreeningControllerResponseSchema = z.infer<
  typeof listScreeningControllerResponseSchema
>;
