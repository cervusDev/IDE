import { IUserRepository } from "@infra/database/repositories/users/IUserRepository";

export interface IAbstractFactory {
  makeUserRepository(): IUserRepository;
}