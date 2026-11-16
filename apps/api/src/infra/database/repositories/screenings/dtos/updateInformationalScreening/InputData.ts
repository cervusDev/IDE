import { ICreateInformationalScreeningInputData } from "../createInformationalScreening/InputData";

export type IUpdateInformationalScreeningInputData = Partial<ICreateInformationalScreeningInputData> & {
  registration: string;
  newVersion: number
  informationalId: string;
  assigneeId: string;
  isLatest: boolean;
  coAuthorId: string;
}