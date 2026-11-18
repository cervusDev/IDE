import { IUseCase } from "@shared/interfaces/IUseCase";
import { InputData } from "./InputData";
import { IScreeningRepository } from "@infra/database/repositories/screenings/IScreeningRepository";
import { IAbstractFactory } from "./IAbstractFactory";
import ConflictError from "@infra/http/errors/ConflictError";
import { IUserRepository } from "@infra/database/repositories/users/IUserRepository";

export class UpdateScreeningUseCase implements IUseCase<InputData, void>{
  private readonly screeningRepository: IScreeningRepository;
  private readonly userRepository: IUserRepository;
  constructor(factory: IAbstractFactory) {
    this.userRepository = factory.makeUserRepository();
    this.screeningRepository = factory.makeScreeningInformationalRepository();
  }
  public async execute(inputData: InputData): Promise<void> {
    const user = await this.userRepository.findById({
      id: inputData.coAuthorId,
    })
    if (!user.id) {
      throw new ConflictError(`Não foi possível encontrar o usuário: ${inputData.coAuthorId}`)
    }
    const currentScreening = await this.screeningRepository.findScreenVersionByRegistration({
      registration: inputData.registration
    })
    if (!currentScreening?.id) {
      throw new ConflictError(`Nenhuma triagem ativa encontrada para este número de cadastro: #${inputData.registration}`)
    }
    await this.screeningRepository.updateInformationalScreening({
      isLatest: true,
      coAuthorId: user.id,
      benefits: inputData.benefits,
      registration: inputData.registration,
      informationalId: String(currentScreening?.id),
      informational: {
        ...inputData.informational,
      },
      familyMembers: inputData.familyMembers,
      newVersion: Number(currentScreening?.version) + 1,
      assigneeId: String(currentScreening?.assignee?.id),
      psychosocialEvaluation: inputData.psychosocialEvaluation,
    })
  }
}