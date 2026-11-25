import { IScreeningRepository } from "@infra/database/repositories/screenings/IScreeningRepository";
import { IAbstractFactory } from "./IABstractFactory";
import { ScreeningRepositoryDatabase } from "@infra/database/repositories/screenings/ScreeningRepositoryDatabase";

export class UpdateAllStudentAgeUseCaseDatabaseFactory implements IAbstractFactory {
  public makeScreeningRepository(): IScreeningRepository {
    return new ScreeningRepositoryDatabase();
  }

}