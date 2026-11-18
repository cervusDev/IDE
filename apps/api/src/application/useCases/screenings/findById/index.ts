import { IUseCase } from "@shared/interfaces/IUseCase";
import { IInputData } from "./InputData";
import { IOutputData } from "./OutputData";
import { IScreeningRepository } from "@infra/database/repositories/screenings/IScreeningRepository";
import { IAbstractFactory } from "./IAbstractFactory";
import ConflictError from "@infra/http/errors/ConflictError";

export class FindScreeningByIdUseCase implements IUseCase<IInputData, IOutputData> {
  private readonly screeningRepository: IScreeningRepository;
  constructor(factory: IAbstractFactory) {
    this.screeningRepository = factory.makeScreeningRepository();
  }
  public async execute(inputData: IInputData): Promise<IOutputData> {
    const screening = await this.screeningRepository.findById({
      id: inputData.id
    })
    if (!screening.informational?.id) {
      throw new ConflictError(`Não foi possível encontrar o formulário: ${inputData.id}`)
    }
    const output: IOutputData = {
      benefits: screening.benefits,
      familyMembers: screening.familyMembers,
      informational: {
        ...screening.informational,
        housingStatus: screening.informational.housingStatus!
      },
      psychosocialEvaluation: screening.psychosocialEvaluation!
    }
    return output;
  }
}