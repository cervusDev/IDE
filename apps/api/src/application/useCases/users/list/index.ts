import { IUserRepository } from '@infra/database/repositories/users/IUserRepository';
import { IUseCase } from '@shared/interfaces/IUseCase';
import { IAbstractFactory } from './IAbstractFactory';
import { IOutputData } from './OutputData';

export class ListUserUseCase implements IUseCase<unknown, IOutputData> {
  private readonly userRepository: IUserRepository;
  constructor(factory: IAbstractFactory) {
    this.userRepository = factory.makeUserRepository();
  }
  public async execute(): Promise<IOutputData> {
    const users = await this.userRepository.list();
    const output: IOutputData = {
      list: users.list.map((item) => ({
        email: item.email,
        id: item.id,
        isActive: item.isActive,
        name: item.name,
      })),
    };
    return output;
  }
}
