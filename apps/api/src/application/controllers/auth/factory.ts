import { AuthController } from '.';
import { AuthUseCaseDatabaseFactory } from '@application/useCases/auth/DatabaseFactory';
import { AuthUseCase } from '@application/useCases/auth';

export function makeAuthController() {
  const controller = new AuthController({
    makeAuthUseCase: () => {
      const factory = new AuthUseCaseDatabaseFactory();
      const useCase = new AuthUseCase(factory);
      return useCase;
    },
  });
  return controller;
}
