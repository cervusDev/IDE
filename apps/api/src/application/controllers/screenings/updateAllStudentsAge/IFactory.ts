import { UpdateAllStudentAgeUseCase } from "@application/useCases/screenings/updateAllStudentsAge";

export interface IAbstractFactory {
  makeUpdateAllStudentsAgeUseCase(): UpdateAllStudentAgeUseCase
}