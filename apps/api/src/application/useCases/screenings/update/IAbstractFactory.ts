import { IScreeningRepository } from "@infra/database/repositories/screenings/IScreeningRepository";
import { IUserRepository } from "@infra/database/repositories/users/IUserRepository";

export interface IAbstractFactory {
  makeScreeningInformationalRepository(): IScreeningRepository
  makeUserRepository(): IUserRepository;
};