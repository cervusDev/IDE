import { IUseCase } from "@shared/interfaces/IUseCase";
import { IInputData } from "./InputData";
import { IScreeningRepository } from "@infra/database/repositories/screenings/IScreeningRepository";
import { IAbstractFactory } from "./IAbstractFactory";

export class CreateScreeningUseCase implements IUseCase<IInputData, void>{
  private readonly screeningRepository: IScreeningRepository;
  constructor(factory: IAbstractFactory) {
    this.screeningRepository = factory.makeScreeningRepository();
  }
  public async execute(inputData: IInputData): Promise<void> {
    await this.screeningRepository.createInformationalScreening({
      informational: inputData.informational,
      benefits: inputData.benefits,
      familyMembers: inputData.familyMembers,
      psychosocialEvaluation: inputData.psychosocialEvaluation
  });
  }
}