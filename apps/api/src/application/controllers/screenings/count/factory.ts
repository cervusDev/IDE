import { CountScreeningController } from ".";
import { CountScreeningUseCaseDatabaseFactory } from "@application/useCases/screenings/count/DatabaseFactory";
import { CountScreeningUseCase } from "@application/useCases/screenings/count";

export function makeCountScreeningController() {
  const controller = new CountScreeningController({
    makeCountScreeningUseCase: () => {
      const factory = new CountScreeningUseCaseDatabaseFactory();
      const useCase = new CountScreeningUseCase(factory);
      return useCase;
    },
  });
  return controller;
}
