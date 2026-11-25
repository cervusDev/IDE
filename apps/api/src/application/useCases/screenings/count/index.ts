import { IUseCase } from "@shared/interfaces/IUseCase";
import { IOutputData } from "./OutputData";
import { IScreeningRepository } from "@infra/database/repositories/screenings/IScreeningRepository";
import { IAbstractFactory } from "./IAbstractFactory";

export class CountScreeningUseCase implements IUseCase<unknown, IOutputData>{
  private readonly screeningRepository: IScreeningRepository;
  constructor(factory: IAbstractFactory) {
    this.screeningRepository = factory.makeScreeningRepository();
  }
  public async execute(): Promise<IOutputData> {
    const screenings = await this.screeningRepository.countInformationalScreening({
      filters: {}
    })
    const output: IOutputData = {
      count: screenings.count
    }
    return output;
  }
}