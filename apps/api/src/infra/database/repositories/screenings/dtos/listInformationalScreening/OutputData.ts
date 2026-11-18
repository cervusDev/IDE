import { informationalScreeningTable } from "@infra/database/schemas";
import { IPaginationParams } from "@shared/interfaces/IPagination";

type IList = typeof informationalScreeningTable.$inferSelect;

export interface IListInformationalScreeningOutput {
  list: IList[]
  page: IPaginationParams
}