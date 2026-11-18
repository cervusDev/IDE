import { ListScreeningUseCase } from '@application/useCases/screenings/list';

export interface IListScreeningControllerAbstractFactory {
  makeListScreeningUseCase(): ListScreeningUseCase;
}
