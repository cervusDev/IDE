import { UpdateAllStudentAgeUseCase } from "@application/useCases/screenings/updateAllStudentsAge";
import { IController, IControllerRequest, IControllerResponse } from "@shared/interfaces/IController";
import { IAbstractFactory } from "./IFactory";
import { EHttpCode } from "@infra/http/enums/HttpCode";

export class UpdateAllStudentAgeController implements IController {
  private readonly useCase: UpdateAllStudentAgeUseCase
  constructor(factory: IAbstractFactory) {
    this.useCase = factory.makeUpdateAllStudentsAgeUseCase();
  }
  public async execute(request: IControllerRequest): Promise<IControllerResponse> {
    await this.useCase.execute();
    const response: IControllerResponse = {
      body: null,
      statusCode: EHttpCode.OK
    }
    return response;
  }
}