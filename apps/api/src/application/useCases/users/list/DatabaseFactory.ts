import { IUserRepository } from '@infra/database/repositories/users/IUserRepository';
import { IAbstractFactory } from './IAbstractFactory';
import { UserRepositoryDatabase } from '@infra/database/repositories/users/UserRepositoryDatabase';

export class ListUserUseCaseDatabaseFactory implements IAbstractFactory {
  public makeUserRepository(): IUserRepository {
    return new UserRepositoryDatabase();
  }
}
