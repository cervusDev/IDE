import { UpdateScreeningUseCase } from "@application/useCases/screenings/update";
import { CreateScreeningController } from ".";
import { UpdateScreeningUpdateUseCaseDatabaseFactory } from "@application/useCases/screenings/update/DatabaseFactory";

export function makeUpdateScreeningController() {
  const controller = new CreateScreeningController({
    makeUpdateScreeningUseCase: () => {
      const factory = new UpdateScreeningUpdateUseCaseDatabaseFactory();
      const useCase = new UpdateScreeningUseCase(factory);
      return useCase;
    },
  });
  return controller;
}
