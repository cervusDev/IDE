import { IController, IControllerRequest, IControllerResponse } from "@shared/interfaces/IController";
import { EHttpCode } from "@infra/http/enums/HttpCode";
import { IAbstractFactory } from "./IFactory";
import { CountScreeningUseCase } from "@application/useCases/screenings/count";
import { CountScreeningControllerResponseSchema } from "./schemas";

export class CountScreeningController implements IController {
  private readonly countScreeningUseCase: CountScreeningUseCase;
  constructor(factory: IAbstractFactory) {
    this.countScreeningUseCase = factory.makeCountScreeningUseCase();
  }
  public async execute(): Promise<IControllerResponse<CountScreeningControllerResponseSchema>> {
    const useCase = await this.countScreeningUseCase.execute()
    const response: IControllerResponse<CountScreeningControllerResponseSchema> = {
      body: {
        count: useCase.count
      },
      statusCode: EHttpCode.OK
    }
    return response;
  }
}