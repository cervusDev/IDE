import { informationalScreeningTable } from "@infra/database/schemas";

type IList = typeof informationalScreeningTable.$inferSelect;

export interface IListInformationalScreeningOutput {
  list: IList[]
}