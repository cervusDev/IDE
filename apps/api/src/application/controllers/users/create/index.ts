import { CreateUserUseCase } from '@application/useCases/users/create';
import {
  IController,
  IControllerRequest,
  IControllerResponse,
} from '@shared/interfaces/IController';
import { ICreateUserControllerFactory } from './IFactory';
import { CreateUserControllerBody } from './schemas';
import { EHttpCode } from '@infra/http/enums/HttpCode';

export class CreateUserController implements IController {
  private readonly createUserUseCase: CreateUserUseCase;

  constructor(factory: ICreateUserControllerFactory) {
    this.createUserUseCase = factory.makeCreateUserUseCase();
  }
  public async execute(
    request: IControllerRequest<CreateUserControllerBody>,
  ): Promise<IControllerResponse> {
    await this.createUserUseCase.execute({
      email: request.body.email,
      name: request.body.name,
      password: request.body.password,
    });
    const response: IControllerResponse = {
      body: null,
      statusCode: EHttpCode.OK,
    };
    return response;
  }
}
