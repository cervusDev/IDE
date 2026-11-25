import { UpdateAllStudentAgeUseCaseDatabaseFactory } from "@application/useCases/screenings/updateAllStudentsAge/DatabaseFactory";
import { UpdateAllStudentAgeController } from ".";
import { UpdateAllStudentAgeUseCase } from "@application/useCases/screenings/updateAllStudentsAge";

export function makeUpdateAllStudentsAgeController() {
  const controller = new UpdateAllStudentAgeController({
    makeUpdateAllStudentsAgeUseCase: () => {
      const factory = new UpdateAllStudentAgeUseCaseDatabaseFactory();
      const useCase = new UpdateAllStudentAgeUseCase(factory);
      return useCase
    }
  })
  return controller;
}