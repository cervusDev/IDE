import { ICountInformationalScreeningInputData } from "./dtos/countInformationalScreening/InputData";
import { ICountInformationalScreeningOutputData } from "./dtos/countInformationalScreening/OutputData";
import { ICreateInformationalScreeningInputData } from "./dtos/createInformationalScreening/InputData";
import { IDeleteInformationalScreeningInputData } from "./dtos/deleteInformationalScreening/InputData";
import { IFindInformationalScreeningInputData } from "./dtos/findInformationalScreening/InputData";
import { IFindInformationalScreeningOutputData } from "./dtos/findInformationalScreening/Output";
import { IListInformationScreeningInputData } from "./dtos/listInformationalScreening/InputData";
import { IListInformationalScreeningOutput } from "./dtos/listInformationalScreening/OutputData";
import { IUpdateInformationalScreeningInputData } from "./dtos/updateInformationalScreening/InputData";

export interface IScreeningRepository {
  countInformationalScreening(inputData: ICountInformationalScreeningInputData): Promise<ICountInformationalScreeningOutputData>;
  createInformationalScreening(inputData: ICreateInformationalScreeningInputData): Promise<void>;
  findInformationalScreening(inputData: IFindInformationalScreeningInputData): Promise<IFindInformationalScreeningOutputData>;
  listInformationalScreening(inputData: IListInformationScreeningInputData): Promise<IListInformationalScreeningOutput>;
  updateInformationalScreening(inputData: IUpdateInformationalScreeningInputData): Promise<void>;
  deleteInformationalScreening(inputData: IDeleteInformationalScreeningInputData): Promise<void>;
}