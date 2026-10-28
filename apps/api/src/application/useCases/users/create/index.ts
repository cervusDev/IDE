import { IUseCase } from '@shared/interfaces/IUseCase';
import { IInputData } from './InputData';
import { IUserRepository } from '@infra/database/repositories/users/IUserRepository';
import { IAbstractFactory } from './IAbstractFactory';
import IHashProvider from '@application/providers/HashProvider/IHashProvider';

export class CreateUserUseCase implements IUseCase<IInputData, void> {
  private readonly userRepository: IUserRepository;
  private readonly hashProvider: IHashProvider;
  constructor(factory: IAbstractFactory) {
    this.userRepository = factory.makeUserRepository();
    this.hashProvider = factory.makeHashProvider();
  }
  public async execute(inputData: IInputData): Promise<void> {
    const passwordEncrypted = await this.hashProvider.encrypt(inputData.password);
    await this.userRepository.create({
      email: inputData.email,
      isActive: true,
      name: inputData.name,
      password: passwordEncrypted,
    });
  }
}
