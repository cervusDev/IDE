import { IScreeningRepository } from "@infra/database/repositories/screenings/IScreeningRepository";
import { IAbstractFactory } from "./IAbstractFactory";
import { ScreeningRepositoryDatabase } from "@infra/database/repositories/screenings/ScreeningRepositoryDatabase";
import { IUserRepository } from "@infra/database/repositories/users/IUserRepository";
import { UserRepositoryDatabase } from "@infra/database/repositories/users/UserRepositoryDatabase";

export class UpdateScreeningUpdateUseCaseDatabaseFactory implements IAbstractFactory {
  public makeScreeningInformationalRepository(): IScreeningRepository {
    return new ScreeningRepositoryDatabase();
  }
  public makeUserRepository(): IUserRepository {
    return new UserRepositoryDatabase();
  }
}