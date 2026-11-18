import { DeleteScreeningController } from ".";
import { DeleteScreeningUseCaseDatabaseFactory } from "@application/useCases/screenings/delete/DatabaseFactory";
import { DeleteScreeningUseCase } from "@application/useCases/screenings/delete";

export function makeDeleteScreeningController() {
  const controller = new DeleteScreeningController({
    makeDeleteScreeningUsecase: () => {
      const factory = new DeleteScreeningUseCaseDatabaseFactory();
      const useCase = new DeleteScreeningUseCase(factory);
      return useCase;
    },
  });
  return controller;
}
