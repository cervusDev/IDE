import { IScreeningRepository } from "@infra/database/repositories/screenings/IScreeningRepository";

export interface IAbstractFactory {
  makeSccreeningRepository(): IScreeningRepository
}