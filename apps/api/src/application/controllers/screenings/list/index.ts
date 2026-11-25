import { IController, IControllerRequest, IControllerResponse } from "@shared/interfaces/IController";
import { ListScreeningControllerQuerySchema, ListScreeningControllerResponseSchema } from "./schemas";
import { ListScreeningUseCase } from "@application/useCases/screenings/list";
import { IListScreeningControllerAbstractFactory } from "./IFactory";
import { ListEmptyResponseError } from "@shared/errors/ListEmptyResponseError";
import { EHttpCode } from "@infra/http/enums/HttpCode";

export class ListScreeningController implements IController {
  private readonly listScreeningUseCase: ListScreeningUseCase;
  constructor(factory: IListScreeningControllerAbstractFactory) {
    this.listScreeningUseCase = factory.makeListScreeningUseCase();
  }
  public async execute(
    request: IControllerRequest<unknown, unknown, ListScreeningControllerQuerySchema>
  ): Promise<IControllerResponse<ListScreeningControllerResponseSchema>> {
    const useCase = await this.listScreeningUseCase.execute({
      filters: {
        healthUnity: request.query.health_unity,
        nis: request.query.nis,
        ra: request.query.ra,
        registration: request.query.registration,
        studentAge: Number(request.query.student_age),
        studentName: request.query.student_name
      },
      pagination: {
        limit: Number(request.query.limit),
        page: Number(request.query.page)
      }
    })
    if (useCase.items.length === 0) {
      throw new ListEmptyResponseError()
    }
    const response: IControllerResponse<ListScreeningControllerResponseSchema> = {
      body: {
        list: useCase.items.map(item => ({
          id: item.id,
          student_ra: item.studentRa,
          health_unity: item.healthUnity,
          legal_guardian_name: item.legalGuardianName,
          registration: item.registration,
          student_age: item.studentAge,
          student_name: item.studentName,
        })),
        pagination: {
          limit: useCase.meta.limit,
          page: useCase.meta.page,
          total: useCase.meta.total,
        }
      },
      statusCode: EHttpCode.OK
    }
    return response;
  }
}