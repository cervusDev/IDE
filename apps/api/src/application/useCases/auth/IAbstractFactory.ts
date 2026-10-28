import IHashProvider from "@application/providers/HashProvider/IHashProvider";
import ITokenProvider from "@application/providers/TokenProvider/ITokenProvider";
import { IUserRepository } from "@infra/database/repositories/users/IUserRepository";

export interface IAbstractFactory {
  makeUserRepository(): IUserRepository;
  makeHashProvider(): IHashProvider;
  makeTokenProvider(): ITokenProvider;
}