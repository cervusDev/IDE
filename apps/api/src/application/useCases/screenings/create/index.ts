import { IUseCase } from "@shared/interfaces/IUseCase";
import { IInputData } from "./InputData";
import { IScreeningRepository } from "@infra/database/repositories/screenings/IScreeningRepository";
import { IAbstractFactory } from "./IAbstractFactory";
import ConflictError from "@infra/http/errors/ConflictError";
import { IUserRepository } from "@infra/database/repositories/users/IUserRepository";

export class CreateScreeningUseCase implements IUseCase<IInputData, void> {
  private readonly screeningRepository: IScreeningRepository;
  private readonly userRepository: IUserRepository;
  constructor(factory: IAbstractFactory) {
    this.screeningRepository = factory.makeScreeningRepository();
    this.userRepository = factory.makeUserRepository();
  }
  public async execute(inputData: IInputData): Promise<void> {
    const user = await this.userRepository.findById({
      id: inputData.assigneeId
    })
    if (!user.id) {
      throw new ConflictError(`Não foi possível encontrar o usuário: ${inputData.assigneeId}`)
    }
    const screening = await this.screeningRepository.findInformationalScreeningByRegistration({
      registration: inputData.informational.registration
    })
    if (screening.registration) {
      throw new ConflictError(`Já existe um formulário com a matrícula: ${inputData.informational.registration}`)
    }
    await this.screeningRepository.createInformationalScreening({
      benefits: inputData.benefits,
      familyMembers: inputData.familyMembers,
      informational: {
        ...inputData.informational,
        version: 1,
        isLatest: true,
        assigneeId: inputData.assigneeId,
      },
      psychosocialEvaluation: inputData.psychosocialEvaluation
    });
  }
}