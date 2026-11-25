import { IPaginatedResult } from "@shared/interfaces/IPagination";

export interface ListDTO {
  id: string;
  studentRa: string;
  studentName: string;
  studentAge: number;
  legalGuardianName: string;
  nis: string | null;
  healthUnity: string;
  registration: string;
}

export type OutputData = IPaginatedResult<ListDTO>