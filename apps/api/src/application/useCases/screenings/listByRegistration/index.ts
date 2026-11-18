import { IUseCase } from "@shared/interfaces/IUseCase";
import { IInputData } from "./InputData";
import { IOutputData } from "./OutputData";
import { IScreeningRepository } from "@infra/database/repositories/screenings/IScreeningRepository";
import { IAbstractFactory } from "./IAbstractFactory";

export class ListScreeningByRegistrationUseCase implements IUseCase<IInputData, IOutputData> {
  private readonly screeningRepository: IScreeningRepository;
  constructor(factory: IAbstractFactory) {
    this.screeningRepository = factory.makeSccreeningRepository();
  }
  public async execute(inputData: IInputData): Promise<IOutputData> {
    const screenings = await this.screeningRepository.listByRegistration({
      registration: inputData.registration
    })
    const output: IOutputData = {
      list: screenings.list.map(item => ({
        id: item.id,
        version: item.version,
        isLatest: item.isLatest,
      }))
    }
    return output;
  }
}