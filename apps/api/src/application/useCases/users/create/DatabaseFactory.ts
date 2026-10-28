import { IUserRepository } from "@infra/database/repositories/users/IUserRepository";
import { IAbstractFactory } from "./IAbstractFactory";
import { UserRepositoryDatabase } from "@infra/database/repositories/users/UserRepositoryDatabase";
import IHashProvider from "@application/providers/HashProvider/IHashProvider";
import { HashProvider } from "@application/providers/HashProvider/implementations/BCryptProvider";

export class CreateUserUseCaseDatabaseFactory implements IAbstractFactory {
  public makeHashProvider(): IHashProvider {
    return new HashProvider();
  }
  public makeUserRepository(): IUserRepository {
    return new UserRepositoryDatabase();
  }
}