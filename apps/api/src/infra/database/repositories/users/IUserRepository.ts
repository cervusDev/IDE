import { ICreateUserRepositoryInputData } from './dtos/create/InputData';
import { IFindByUserEmailRepositoryInputData } from './dtos/findByEmail/InputData';
import { IFindByUserEmailRepositoryOutputData } from './dtos/findByEmail/OutputData';
import { IListUserRepositoryOutputData } from './dtos/list/OutputData';

export interface IUserRepository {
  create(inputData: ICreateUserRepositoryInputData): Promise<void>;
  findByEmail(
    inputData: IFindByUserEmailRepositoryInputData,
  ): Promise<IFindByUserEmailRepositoryOutputData>;
  list(): Promise<IListUserRepositoryOutputData>;
}
