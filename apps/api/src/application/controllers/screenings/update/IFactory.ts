import { UpdateScreeningUseCase } from '@application/useCases/screenings/update';

export interface IUpdateScreeningControllerFactory {
  makeUpdateScreeningUseCase(): UpdateScreeningUseCase;
}
