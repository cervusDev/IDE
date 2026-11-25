import { IUseCase } from "@shared/interfaces/IUseCase";
import { IInputData } from "./InputData";
import { ListDTO, OutputData } from "./OutputData";
import { IScreeningRepository } from "@infra/database/repositories/screenings/IScreeningRepository";
import { IAbstractFactory } from "./IAbstractFactory";
import { createPaginatedResponse } from "@shared/interfaces/IPagination";

export class ListScreeningUseCase implements IUseCase<IInputData, OutputData> {
  private readonly screeningRepository: IScreeningRepository;
  constructor(factory: IAbstractFactory) {
    this.screeningRepository = factory.makeScreeningRepository();
  }
  public async execute(inputData: IInputData): Promise<OutputData> {
    const limit = inputData.pagination.limit || 8;
    const filters = {
      healthUnity: inputData.filters?.healthUnity,
      nis: inputData.filters?.nis,
      ra: inputData.filters?.ra,
      registration: inputData.filters?.registration,
      studentAge: inputData.filters?.studentAge,
      studentName: inputData.filters?.studentName,
    };
    const [total, screenings] = await Promise.all([
      this.screeningRepository.countInformationalScreening({ filters }),
      this.screeningRepository.listInformationalScreening({
        filters,
        pagination: {
          limit,
          page: inputData.pagination.page,
        }
      })
    ]);
    const items: ListDTO[] = screenings.list.map(item => ({
      healthUnity: item.healthUnity,
      id: item.id,
      studentRa: item.studentRa,
      legalGuardianName: item.legalGuardianName!,
      nis: item.nis,
      registration: item.registration,
      studentAge: item.studentAge,
      studentName: item.studentName,
    }));
    return createPaginatedResponse<ListDTO>({
      items,
      limit,
      page: inputData.pagination.page!,
      total: total.count
    });
  }
}