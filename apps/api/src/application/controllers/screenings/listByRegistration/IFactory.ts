import { ListScreeningByRegistrationUseCase } from '@application/useCases/screenings/listByRegistration';

export interface IListScreeningByRegistrationControllerAbstractFactory {
  makeListScreeningByRegistrationUseCase(): ListScreeningByRegistrationUseCase;
}
