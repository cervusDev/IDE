import { ListScreeningByRegistrationController } from ".";
import { ListScreeningByRegistrationUseCase } from "@application/useCases/screenings/listByRegistration";
import { ListScreeningByRegistrationUseCaseDatabaseFactory } from "@application/useCases/screenings/listByRegistration/DatabaseFactory";

export function makeListScreeningByRegistrationController() {
  const controller = new ListScreeningByRegistrationController({
    makeListScreeningByRegistrationUseCase: () => {
      const factory = new ListScreeningByRegistrationUseCaseDatabaseFactory();
      const useCase = new ListScreeningByRegistrationUseCase(factory);
      return useCase;
    },
  });
  return controller;
}
