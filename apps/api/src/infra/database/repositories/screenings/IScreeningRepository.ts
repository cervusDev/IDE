import { ICountInformationalScreeningInputData } from "./dtos/countInformationalScreening/InputData";
import { ICountInformationalScreeningOutputData } from "./dtos/countInformationalScreening/OutputData";
import { ICreateInformationalScreeningInputData } from "./dtos/createInformationalScreening/InputData";
import { IDeleteInformationalScreeningInputData } from "./dtos/deleteInformationalScreening/InputData";
import { IDepreciateInformationalScreeningVersionInputData } from "./dtos/depreciateInformationalScreeningVersion/InputData";
import { IFindInformationalScreeningInputData } from "./dtos/findInformationalScreening/InputData";
import { IFindInformationalScreeningOutputData } from "./dtos/findInformationalScreening/Output";
import { IFindInformationalScreeningByRegistrationInputData } from "./dtos/findInformationalScreeningByRegistration/InputData";
import { IFindInformationalScreeningByRegistrationOutputData } from "./dtos/findInformationalScreeningByRegistration/OutputData";
import { IFindScreenVersionByRegistrationInputData } from "./dtos/findScreenVersionByRegistration/InputData";
import { IFindScreenVersionByRegistrationOutputData } from "./dtos/findScreenVersionByRegistration/OutputData";
import { IListInformationScreeningInputData } from "./dtos/listInformationalScreening/InputData";
import { IListInformationalScreeningOutput } from "./dtos/listInformationalScreening/OutputData";
import { IUpdateInformationalScreeningInputData } from "./dtos/updateInformationalScreening/InputData";

export interface IScreeningRepository {
  countInformationalScreening(inputData: ICountInformationalScreeningInputData): Promise<ICountInformationalScreeningOutputData>;
  createInformationalScreening(inputData: ICreateInformationalScreeningInputData): Promise<void>;
  findInformationalScreening(inputData: IFindInformationalScreeningInputData): Promise<IFindInformationalScreeningOutputData>;
  findInformationalScreeningByRegistration(inputData: IFindInformationalScreeningByRegistrationInputData): Promise<IFindInformationalScreeningByRegistrationOutputData>
  listInformationalScreening(inputData: IListInformationScreeningInputData): Promise<IListInformationalScreeningOutput>;
  updateInformationalScreening(inputData: IUpdateInformationalScreeningInputData): Promise<void>;
  deleteInformationalScreening(inputData: IDeleteInformationalScreeningInputData): Promise<void>;
  depreciateInformationalScreening(inputData: IDepreciateInformationalScreeningVersionInputData): Promise<void>
  findScreenVersionByRegistration(inputData: IFindScreenVersionByRegistrationInputData): Promise<IFindScreenVersionByRegistrationOutputData | null>;

}