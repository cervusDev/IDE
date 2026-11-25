import { CountScreeningUseCase } from "@application/useCases/screenings/count";

export interface IAbstractFactory {
  makeCountScreeningUseCase(): CountScreeningUseCase
}