import { ListUserUseCase } from '@application/useCases/users/list';

export interface IListUserControllerFactory {
  makeListUserUseCase(): ListUserUseCase;
}
