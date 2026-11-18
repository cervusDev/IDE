import { FindScreeningByIdUseCase } from '@application/useCases/screenings/findById';

export interface IAbstractFactory {
  makeFindScreeningByIdUseCase(): FindScreeningByIdUseCase;
}
