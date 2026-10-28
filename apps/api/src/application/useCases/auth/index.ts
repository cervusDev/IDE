import { IUseCase } from '@shared/interfaces/IUseCase';
import { IInputData } from './InputData';
import { IOutputData } from './OutputData';
import { IUserRepository } from '@infra/database/repositories/users/IUserRepository';
import IHashProvider from '@application/providers/HashProvider/IHashProvider';
import ITokenProvider from '@application/providers/TokenProvider/ITokenProvider';
import { IAbstractFactory } from './IAbstractFactory';
import ConflictError from '@infra/http/errors/ConflictError';

export class AuthUseCase implements IUseCase<IInputData, IOutputData> {
  private readonly userRepository: IUserRepository;
  private readonly hashProvider: IHashProvider;
  private readonly tokenProvider: ITokenProvider;
  constructor(factory: IAbstractFactory) {
    this.hashProvider = factory.makeHashProvider();
    this.tokenProvider = factory.makeTokenProvider();
    this.userRepository = factory.makeUserRepository();
  }
  public async execute(inputData: IInputData): Promise<IOutputData> {
    const user = await this.userRepository.findByEmail({ email: inputData.email });
    if (!user) {
      throw new ConflictError('usuário não encontrado');
    }
    if (!user.isActive) {
      throw new ConflictError('usuário inativo');
    }
    const passwordIsCorrect = await this.hashProvider.compare({
      hashed: user.password,
      text: inputData.password,
    });
    if (!passwordIsCorrect) {
      throw new ConflictError('senha incorreta');
    }
    const token = this.tokenProvider.generate({
      payload: {
        id: user.id,
        is_active: user.isActive,
      },
    });
    const output: IOutputData = {
      token,
    };
    return output;
  }
}
