import IHashProvider from "@application/providers/HashProvider/IHashProvider";
import { IUserRepository } from "@infra/database/repositories/users/IUserRepository";

export interface IAbstractFactory {
  makeUserRepository(): IUserRepository;
  makeHashProvider(): IHashProvider;
}