import { CreateUserUseCaseDatabaseFactory } from "@application/useCases/users/create/DatabaseFactory";
import { CreateUserController } from ".";
import { CreateUserUseCase } from "@application/useCases/users/create";

export function makeCreateUserController() {
  const controller = new CreateUserController({
    makeCreateUserUseCase: () => {
      const factory = new CreateUserUseCaseDatabaseFactory();
      const useCase = new CreateUserUseCase(factory);
      return useCase;
    },
  });
  return controller;
}
