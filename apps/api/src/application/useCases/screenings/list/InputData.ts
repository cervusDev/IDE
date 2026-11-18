import { IPaginationParams } from "@shared/interfaces/IPagination";

export interface IInputData {
  filters: {
    healthUnity?: string;
    nis?: string;
    registration?: string;
    studentName?: string;
    studentAge?: number;
    ra?: string;
  };
  pagination: IPaginationParams
};