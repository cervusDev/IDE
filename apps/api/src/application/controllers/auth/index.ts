import {
  IController,
  IControllerRequest,
  IControllerResponse,
} from '@shared/interfaces/IController';
import { AuthControllerBody, AuthControllerResponse } from './schemas';
import { EHttpCode } from '@infra/http/enums/HttpCode';
import { AuthUseCase } from '@application/useCases/auth';
import { IAuthControllerFactory } from './IFactory';

export class AuthController implements IController {
  private readonly authUseCase: AuthUseCase;

  constructor(factory: IAuthControllerFactory) {
    this.authUseCase = factory.makeAuthUseCase();
  }
  public async execute(
    request: IControllerRequest<AuthControllerBody>,
  ): Promise<IControllerResponse<AuthControllerResponse>> {
    const { token } = await this.authUseCase.execute({
      email: request.body.email,
      password: request.body.password,
    });
    const response: IControllerResponse<AuthControllerResponse> = {
      body: {
        token,
      },
      statusCode: EHttpCode.OK,
    };
    return response;
  }
}
