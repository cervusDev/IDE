import { CreateUserUseCase } from '@application/useCases/users/create';

export interface ICreateUserControllerFactory {
  makeCreateUserUseCase(): CreateUserUseCase;
}
