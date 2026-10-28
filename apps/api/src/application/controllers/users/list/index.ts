import {
  IController,
  IControllerRequest,
  IControllerResponse,
} from '@shared/interfaces/IController';
import { IListUserControllerFactory } from './IFactory';
import { ListUserControllerResponse } from './schemas';
import { EHttpCode } from '@infra/http/enums/HttpCode';
import { ListUserUseCase } from '@application/useCases/users/list';

export class ListUserController implements IController {
  private readonly listUserUseCase: ListUserUseCase;

  constructor(factory: IListUserControllerFactory) {
    this.listUserUseCase = factory.makeListUserUseCase();
  }
  public async execute(
    _: IControllerRequest,
  ): Promise<IControllerResponse<ListUserControllerResponse>> {
    const data = await this.listUserUseCase.execute();
    const response: IControllerResponse<ListUserControllerResponse> = {
      body: {
        list: data.list.map(item => ({
          email: item.email,
          id: item.id,
          is_active: item.isActive,
          name: item.name
        }))
      },
      statusCode: EHttpCode.OK,
    };
    return response;
  }
}
