import IHashProvider from '@application/providers/HashProvider/IHashProvider';
import ITokenProvider from '@application/providers/TokenProvider/ITokenProvider';
import { IUserRepository } from '@infra/database/repositories/users/IUserRepository';
import { IAbstractFactory } from './IAbstractFactory';
import { UserRepositoryDatabase } from '@infra/database/repositories/users/UserRepositoryDatabase';
import { HashProvider } from '@application/providers/HashProvider/implementations/BCryptProvider';
import JsonWebTokenProvider from '@application/providers/TokenProvider/implementations/JsonWebTokenProvider';

export class AuthUseCaseDatabaseFactory implements IAbstractFactory {
  public makeUserRepository(): IUserRepository {
    return new UserRepositoryDatabase();
  }
  public makeHashProvider(): IHashProvider {
    return new HashProvider();
  }
  public makeTokenProvider(): ITokenProvider {
    return new JsonWebTokenProvider();
  }
}
