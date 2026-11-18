import { ListScreeningController } from ".";
import { ListScreeningUseCaseDatabaseFactory } from "@application/useCases/screenings/list/DatabaseFactory";
import { ListScreeningUseCase } from "@application/useCases/screenings/list";

export function makeListScreeningController() {
  const controller = new ListScreeningController({
    makeListScreeningUseCase: () => {
      const factory = new ListScreeningUseCaseDatabaseFactory();
      const useCase = new ListScreeningUseCase(factory);
      return useCase;
    },
  });
  return controller;
}
