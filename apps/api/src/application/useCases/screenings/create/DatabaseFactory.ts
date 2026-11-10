import { IScreeningRepository } from "@infra/database/repositories/screenings/IScreeningRepository";
import { IAbstractFactory } from "./IAbstractFactory";
import { ScreeningRepositoryDatabase } from "@infra/database/repositories/screenings/ScreeningRepositoryDatabase";

export class CreateScreeningUseCaseDatabaseFactory implements IAbstractFactory {
  public makeScreeningRepository(): IScreeningRepository {
    return new ScreeningRepositoryDatabase();
  }
}