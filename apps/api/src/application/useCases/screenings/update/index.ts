import { IUseCase } from "@shared/interfaces/IUseCase";
import { InputData } from "./InputData";
import { IScreeningRepository } from "@infra/database/repositories/screenings/IScreeningRepository";
import { IAbstractFactory } from "./IAbstractFactory";
import ConflictError from "@infra/http/errors/ConflictError";
import { IUserRepository } from "@infra/database/repositories/users/IUserRepository";

export class UpdateScreeningUseCase implements IUseCase<InputData, void> {
  private readonly screeningRepository: IScreeningRepository;
  private readonly userRepository: IUserRepository;
  constructor(factory: IAbstractFactory) {
    this.userRepository = factory.makeUserRepository();
    this.screeningRepository = factory.makeScreeningInformationalRepository();
  }
  public async execute(inputData: InputData): Promise<void> {
    const { userId } = await this.validateUser(inputData.coAuthorId);
    const { assigneeId, currentScreeningId, version } = await this.validateScreening(inputData.registration)
    await this.screeningRepository.updateInformationalScreening({
      isLatest: true,
      coAuthorId: userId,
      assigneeId: assigneeId,
      newVersion: version + 1,
      benefits: inputData.benefits,
      informationalId: currentScreeningId,
      registration: inputData.registration,
      familyMembers: inputData.familyMembers,
      informational: inputData.informational,
      psychosocialEvaluation: inputData.psychosocialEvaluation,
    })
  }
  private async validateUser(coAuthorId: string): Promise<{ userId: string }> {
    const user = await this.userRepository.findById({
      id: coAuthorId,
    })
    if (!user.id) {
      throw new ConflictError(`Não foi possível encontrar o usuário: ${coAuthorId}`)
    }
    return {
      userId: user.id
    }
  }
  private async validateScreening(registration: string): Promise<{
    currentScreeningId: string;
    version: number;
    assigneeId: string
  }> {
    const currentScreening = await this.screeningRepository.findScreenVersionByRegistration({
      registration
    })
    if (!currentScreening?.id) {
      throw new ConflictError(`Nenhuma triagem ativa encontrada para este número de cadastro: #${registration}`)
    }
    console.log('')
    if (!currentScreening.assignee?.id) {
      throw new ConflictError(`Nenhum assinante foi encontrado para essa triagem`)
    }
    return {
      assigneeId: currentScreening.assignee.id,
      currentScreeningId: currentScreening.id,
      version: currentScreening.version
    }
  }
}