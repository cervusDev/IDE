import { ICreateScreeningService } from "./create/InputData";

export interface IService {
  create(inputData: ICreateScreeningService): Promise<void>;
}