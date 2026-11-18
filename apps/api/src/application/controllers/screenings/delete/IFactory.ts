import { DeleteScreeningUseCase } from '@application/useCases/screenings/delete';

export interface IAbstractFactory {
  makeDeleteScreeningUsecase(): DeleteScreeningUseCase;
}
