import { IScreeningRepository } from "@infra/database/repositories/screenings/IScreeningRepository";
import { IAbstractFactory } from "./IAbstractFactory";
import { ScreeningRepositoryDatabase } from "@infra/database/repositories/screenings/ScreeningRepositoryDatabase";

export class ListScreeningByRegistrationUseCaseDatabaseFactory implements IAbstractFactory {
  public makeSccreeningRepository(): IScreeningRepository {
    return new ScreeningRepositoryDatabase();
  }
}