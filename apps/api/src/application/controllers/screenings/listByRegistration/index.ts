import { IController, IControllerRequest, IControllerResponse } from "@shared/interfaces/IController";
import { ListScreeningByRegistrationControllerQuerySchema, ListScreeningByRegistrationControllerResponseSchema } from "./schemas";
import { IListScreeningByRegistrationControllerAbstractFactory } from "./IFactory";
import { ListEmptyResponseError } from "@shared/errors/ListEmptyResponseError";
import { EHttpCode } from "@infra/http/enums/HttpCode";
import { ListScreeningByRegistrationUseCase } from "@application/useCases/screenings/listByRegistration";

export class ListScreeningByRegistrationController implements IController {
  private readonly listScreeningByRegistrationUseCase: ListScreeningByRegistrationUseCase;
  constructor(factory: IListScreeningByRegistrationControllerAbstractFactory) {
    this.listScreeningByRegistrationUseCase = factory.makeListScreeningByRegistrationUseCase();
  }
  public async execute(
    request: IControllerRequest<unknown, unknown, ListScreeningByRegistrationControllerQuerySchema>
  ): Promise<IControllerResponse<ListScreeningByRegistrationControllerResponseSchema>> {
    const useCase = await this.listScreeningByRegistrationUseCase.execute({
      registration: request.query.registration
    })
    if (useCase.list.length === 0) {
      throw new ListEmptyResponseError()
    }
    const response: IControllerResponse<ListScreeningByRegistrationControllerResponseSchema> = {
      body: {
        list: useCase.list.map(item => ({
          id: item.id,
          version: item.version,
          is_latest: item.isLatest
        }))
      },
      statusCode: EHttpCode.OK
    }
    return response;
  }
}