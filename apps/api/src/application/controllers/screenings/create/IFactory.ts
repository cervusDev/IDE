import { CreateScreeningUseCase } from '@application/useCases/screenings/create';

export interface ICreateScreeningControllerFactory {
  makeCreateScreeningUseCase(): CreateScreeningUseCase;
}
