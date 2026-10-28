import { AuthUseCase } from '@application/useCases/auth';

export interface IAuthControllerFactory {
  makeAuthUseCase(): AuthUseCase;
}
