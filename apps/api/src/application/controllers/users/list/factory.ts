import { ListUserController } from '.';
import { ListUserUseCaseDatabaseFactory } from '@application/useCases/users/list/DatabaseFactory';
import { ListUserUseCase } from '@application/useCases/users/list';

export function makeListUserController() {
  const controller = new ListUserController({
    makeListUserUseCase: () => {
      const factory = new ListUserUseCaseDatabaseFactory();
      const useCase = new ListUserUseCase(factory);
      return useCase;
    },
  });
  return controller;
}
