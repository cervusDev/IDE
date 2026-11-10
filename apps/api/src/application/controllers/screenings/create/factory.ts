import { CreateScreeningController } from ".";
import { CreateScreeningUseCaseDatabaseFactory } from "@application/useCases/screenings/create/DatabaseFactory";
import { CreateScreeningUseCase } from "@application/useCases/screenings/create";

export function makeCreateScreeningController() {
  const controller = new CreateScreeningController({
    makeCreateScreeningUseCase: () => {
      const factory = new CreateScreeningUseCaseDatabaseFactory();
      const useCase = new CreateScreeningUseCase(factory);
      return useCase;
    },
  });
  return controller;
}
