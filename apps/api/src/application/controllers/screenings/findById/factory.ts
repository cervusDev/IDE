import { FindScreeningByIdController } from ".";
import { FindScreeningByIdUseCaseDatabaseFactory } from "@application/useCases/screenings/findById/DatabaseFactory";
import { FindScreeningByIdUseCase } from "@application/useCases/screenings/findById";

export function makeFindScreeningByIdController() {
  const controller = new FindScreeningByIdController({
    makeFindScreeningByIdUseCase: () => {
      const factory = new FindScreeningByIdUseCaseDatabaseFactory();
      const useCase = new FindScreeningByIdUseCase(factory);
      return useCase;
    },
  });
  return controller;
}
