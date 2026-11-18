import { ICreateScreeningService } from "./create/InputData";
import { IDeleteScreeningInputData } from "./delete/InputData";
import { IFindScreeningByIdInputData } from "./findById/InputData";
import { IFindScreeningByIdOutputData } from "./findById/OutputData";
import { IListScreeningInputData } from "./list/InputData";
import { IListScreeningOutputData } from "./list/OutputData";
import { IListScreningVersionsInputData } from "./listVersions/InputData";
import { IListScreeningVersionsOutputData } from "./listVersions/OutputData";
import { IUpdateScreeningInputData } from "./update/InputData";

export interface IService {
  update(inputData: IUpdateScreeningInputData): Promise<void>;
  delete(inputData: IDeleteScreeningInputData): Promise<void>;
  findById(inputData: IFindScreeningByIdInputData): Promise<IFindScreeningByIdOutputData>
  listVersions(inputData: IListScreningVersionsInputData): Promise<IListScreeningVersionsOutputData>
  list(inputData: IListScreeningInputData): Promise<IListScreeningOutputData>;
  create(inputData: ICreateScreeningService): Promise<void>;
}