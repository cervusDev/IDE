import { IUseCase } from "@shared/interfaces/IUseCase";
import { IInputData } from "./InputData";
import { IScreeningRepository } from "@infra/database/repositories/screenings/IScreeningRepository";
import { IAbstractFactory } from "./IAbstractFactory";
import ConflictError from "@infra/http/errors/ConflictError";

export class DeleteScreeningUseCase implements IUseCase<IInputData, void> {
  private readonly screeningRepository: IScreeningRepository;
  constructor(factory: IAbstractFactory) {
    this.screeningRepository = factory.makeScreeningRepository();
  }
  public async execute(inputData: IInputData): Promise<void> {
    const screening = await this.screeningRepository.findInformationalScreeningByRegistration({
      registration: inputData.registration
    })
    if (!screening.registration) {
      throw new ConflictError(`Não foi possível encontrar o formulário: ${inputData.registration}`)
    }
    await this.screeningRepository.deleteInformationalScreening({
      registration: inputData.registration
    })
  }
}