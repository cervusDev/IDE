import { and, count, eq, SQL } from 'drizzle-orm';
import DrizzleORMError from "@infra/database/errors/DrizzleORMError";
import { ICreateInformationalScreeningInputData } from "./dtos/createInformationalScreening/InputData";
import { IDeleteInformationalScreeningInputData } from "./dtos/deleteInformationalScreening/InputData";
import { IFindInformationalScreeningInputData } from "./dtos/findInformationalScreening/InputData";
import { IFindInformationalScreeningOutputData } from "./dtos/findInformationalScreening/Output";
import { IListInformationScreeningInputData } from "./dtos/listInformationalScreening/InputData";
import { IListInformationalScreeningOutput } from "./dtos/listInformationalScreening/OutputData";
import { IUpdateInformationalScreeningInputData } from "./dtos/updateInformationalScreening/InputData";
import { IScreeningRepository } from "./IScreeningRepository";
import { benefitsTable, familyMembersTable, informationalScreeningTable, psychosocialEvaluationsTable } from '@infra/database/schemas';
import { drizzleDatabase } from '@infra/database';
import { calculatePagination } from '@shared/interfaces/IPagination';
import { ICountInformationalScreeningInputData } from './dtos/countInformationalScreening/InputData';
import { ICountInformationalScreeningOutputData } from './dtos/countInformationalScreening/OutputData';

export class ScreeningRepositoryDatabase implements IScreeningRepository {
  public async countInformationalScreening(inputData: ICountInformationalScreeningInputData): Promise<ICountInformationalScreeningOutputData> {
    try {
      const whereConditions: SQL[] = [];
      // INSERIR OS IFS AQUI
      const database = drizzleDatabase.getInstance();
      const query = database
      .select({ count: count() })
      .from(informationalScreeningTable);

      if (whereConditions.length > 0) {
        query.where(and(...whereConditions));
      }
      const results = await query;
      const output: ICountInformationalScreeningOutputData = {
        count: results[0]?.count ?? 0
      }
      return output;
    } catch (err) {
      throw new DrizzleORMError(JSON.stringify(err));
    }
  }
  public async createInformationalScreening(inputData: ICreateInformationalScreeningInputData): Promise<void> {
    try {
      const database = drizzleDatabase.getInstance();
      await database.transaction(async (tx) => {
          const [screening] = await tx
            .insert(informationalScreeningTable)
            .values(inputData.informational)
            .returning({ id: informationalScreeningTable.id });

          if (inputData.familyMembers && inputData.familyMembers.length > 0) {
            await tx.insert(familyMembersTable).values(
              inputData.familyMembers.map((member) => ({
                ...member,
                informationalScreeningId: screening.id,
              }))
            );
          }

          if (inputData.psychosocialEvaluation) {
            await tx.insert(psychosocialEvaluationsTable).values({
              ...inputData.psychosocialEvaluation,
              informationalScreeningId: screening.id,
            });
          }

          if (inputData.benefits) {
            await tx.insert(benefitsTable).values({
              ...inputData.benefits,
              screeningId: screening.id,
            });
          }
        });
    } catch (err) {
      throw new DrizzleORMError(JSON.stringify(err));
    }
  }
  public async findInformationalScreening(inputData: IFindInformationalScreeningInputData): Promise<IFindInformationalScreeningOutputData> {
    try {
      const database = drizzleDatabase.getInstance();
      const [result] = await database
        .select()
        .from(informationalScreeningTable)
        .where(eq(informationalScreeningTable.id, inputData.id));
      return result as IFindInformationalScreeningOutputData;
    } catch (err) {
      throw new DrizzleORMError(JSON.stringify(err));
    }
  }

  public async listInformationalScreening(inputData: IListInformationScreeningInputData): Promise<IListInformationalScreeningOutput> {
    try {
      const whereConditions: SQL[] = [];
      // INSERIR OS IFS AQUI;
      const database = drizzleDatabase.getInstance();
      const { limit, offset } = calculatePagination(inputData.pagination);
      const results = await database
        .select()
        .from(informationalScreeningTable)
        .where(and(...whereConditions))
        .limit(limit)
        .offset(offset)
      const output: IListInformationalScreeningOutput = {
        list: results.map(item => ({
          createdAt: item.createdAt,
          educationalAttainment: item.educationalAttainment,
          fatherAge: item.fatherAge,
          fatherContact: item.fatherContact,
          fatherEducationalAttainment: item.fatherEducationalAttainment,
          fatherName: item.fatherName,
          fatherOccupation: item.fatherOccupation,
          grossHouseholdIncome: item.grossHouseholdIncome,
          healthUnity: item.healthUnity,
          housingStatus: item.housingStatus,
          id: item.id,
          legalGuardianName: item.legalGuardianName,
          motherAge: item.motherAge,
          motherContact: item.motherContact,
          motherEducationalAttainment: item.motherEducationalAttainment,
          motherName: item.motherName,
          motherOccupation: item.motherOccupation,
          neighborhood: item.neighborhood,
          nis: item.nis,
          parentsMaritalStatus: item.parentsMaritalStatus,
          registration: item.registration,
          religion: item.religion,
          schoolName: item.schoolName,
          schoolPeriod: item.schoolPeriod,
          streetAddress: item.streetAddress,
          studentAge: item.studentAge,
          studentBirthDate: item.studentBirthDate,
          studentColor: item.studentColor,
          studentName: item.studentName,
          studentRa: item.studentRa,
          updatedAt: item.updatedAt
        }))
      }
      return output;
    } catch (err) {
      throw new DrizzleORMError(JSON.stringify(err));
    }
  }

  public async updateInformationalScreening(inputData: IUpdateInformationalScreeningInputData): Promise<void> {
    try {
      const { id, ...dataToUpdate } = inputData as any;
      const database = drizzleDatabase.getInstance();
      await database
        .update(informationalScreeningTable)
        .set(dataToUpdate)
        .where(eq(informationalScreeningTable.id, id));
    } catch (err) {
      throw new DrizzleORMError(JSON.stringify(err));
    }
  }

  public async deleteInformationalScreening(inputData: IDeleteInformationalScreeningInputData): Promise<void> {
    try {
      const database = drizzleDatabase.getInstance();
      await database
        .delete(informationalScreeningTable)
        .where(eq(informationalScreeningTable.id, inputData.id));
    } catch (err) {
      throw new DrizzleORMError(JSON.stringify(err));
    }
  }
}