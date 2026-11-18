import { IController, IControllerRequest, IControllerResponse } from "@shared/interfaces/IController";
import { DeleteScreeningControllerParamsSchema } from "./schema";
import { DeleteScreeningUseCase } from "@application/useCases/screenings/delete";
import { IAbstractFactory } from "./IFactory";
import { EHttpCode } from "@infra/http/enums/HttpCode";

export class DeleteScreeningController implements IController {
  private readonly deleteScreeningUseCase: DeleteScreeningUseCase;
  constructor(factory: IAbstractFactory) {
    this.deleteScreeningUseCase = factory.makeDeleteScreeningUsecase();
  }
  public async execute(
    request: IControllerRequest<unknown, DeleteScreeningControllerParamsSchema>
  ): Promise<IControllerResponse> {
    await this.deleteScreeningUseCase.execute({
      registration: request.params.registration
    })
    const response: IControllerResponse = {
      body: null,
      statusCode: EHttpCode.OK,
    };
    return response;
  }
}