import { IScreeningRepository } from "@infra/database/repositories/screenings/IScreeningRepository";
import { IUseCase } from "@shared/interfaces/IUseCase";
import { IAbstractFactory } from "./IABstractFactory";

export class UpdateAllStudentAgeUseCase implements IUseCase<void, void> {
  private readonly screeningRepository: IScreeningRepository;
  constructor(factory: IAbstractFactory) {
    this.screeningRepository = factory.makeScreeningRepository();
  }
  public async execute(): Promise<void> {
    await this.screeningRepository.updateAllStudentAge()
  }
}