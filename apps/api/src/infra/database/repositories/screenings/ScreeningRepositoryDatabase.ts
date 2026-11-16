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
import { benefitsTable, familyMembersTable, informationalScreeningTable, psychosocialEvaluationsTable, usersTable } from '@infra/database/schemas';
import { drizzleDatabase } from '@infra/database';
import { calculatePagination } from '@shared/interfaces/IPagination';
import { ICountInformationalScreeningInputData } from './dtos/countInformationalScreening/InputData';
import { ICountInformationalScreeningOutputData } from './dtos/countInformationalScreening/OutputData';
import { IFindScreenVersionByRegistrationInputData } from './dtos/findScreenVersionByRegistration/InputData';
import { IFindScreenVersionByRegistrationOutputData } from './dtos/findScreenVersionByRegistration/OutputData';
import { IDepreciateInformationalScreeningVersionInputData } from './dtos/depreciateInformationalScreeningVersion/InputData';
import { IFindInformationalScreeningByRegistrationInputData } from './dtos/findInformationalScreeningByRegistration/InputData';
import { IFindInformationalScreeningByRegistrationOutputData } from './dtos/findInformationalScreeningByRegistration/OutputData';

export class ScreeningRepositoryDatabase implements IScreeningRepository {
public async findInformationalScreeningByRegistration(
    inputData: IFindInformationalScreeningByRegistrationInputData
  ): Promise<IFindInformationalScreeningByRegistrationOutputData> {
    try {
      const database = drizzleDatabase.getInstance();
      const [screening] = await database
        .select({
          registration: informationalScreeningTable.registration,
        })
        .from(informationalScreeningTable)
        .where(
          and(
            eq(informationalScreeningTable.registration, inputData.registration),
            eq(informationalScreeningTable.isLatest, true)
          )
        )
        .limit(1);

      return {
        registration: screening?.registration ?? null,
      };
    } catch (err) {
      throw new DrizzleORMError(JSON.stringify(err));
    }
  }
  public async depreciateInformationalScreening(inputData: IDepreciateInformationalScreeningVersionInputData): Promise<void> {
    try {
      const database = drizzleDatabase.getInstance();
      await database.update(informationalScreeningTable)
        .set({ isLatest: false })
        .where(eq(informationalScreeningTable.id, inputData.id));
    } catch (err) {
      throw new DrizzleORMError(JSON.stringify(err));
    }
  }
public async findScreenVersionByRegistration(
    inputData: IFindScreenVersionByRegistrationInputData
  ): Promise<IFindScreenVersionByRegistrationOutputData | null> {
    try {
      const database = drizzleDatabase.getInstance();
      const [screening] = await database
        .select({
          id: informationalScreeningTable.id,
          version: informationalScreeningTable.version,
          assignee: {
            id: usersTable.id,
          },
        })
        .from(informationalScreeningTable)
        .leftJoin(
          usersTable,
          eq(informationalScreeningTable.assigneeId, usersTable.id)
        )
        .where(
          and(
            eq(informationalScreeningTable.registration, inputData.registration),
            eq(informationalScreeningTable.isLatest, true)
          )
        )
        .limit(1);

      if (!screening) {
        return null;
      }

      const output: IFindScreenVersionByRegistrationOutputData = {
        id: screening.id,
        version: screening.version,
        assignee: screening.assignee?.id ? { id: screening.assignee.id } : null,
      };

      return output;
    } catch (err) {
      throw new DrizzleORMError(JSON.stringify(err));
    }
  }
  public async countInformationalScreening(_: ICountInformationalScreeningInputData): Promise<ICountInformationalScreeningOutputData> {
    try {
      const whereConditions: SQL[] = [];
      const database = drizzleDatabase.getInstance();
      const query = database
        .select({ count: count() })
        .from(informationalScreeningTable);

      if (whereConditions.length > 0) {
        query.where(and(...whereConditions));
      }
      const [result] = await query;
      const output: ICountInformationalScreeningOutputData = {
        count: result?.count ?? 0
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
          assigneeId: item.assigneeId,
          coAuthorId: item.coAuthorId,
          isLatest: item.isLatest,
          version: item.version,
          createdAt: item.createdAt,
          studentEducationalAttainment: item.studentEducationalAttainment,
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
          studentGender: item.studentGender,
          studentGenderOther: item.studentGenderOther,
          neighborhood: item.neighborhood,
          nis: item.nis,
          parentsMaritalStatus: item.parentsMaritalStatus,
          registration: item.registration,
          religion: item.religion,
          studentSchoolName: item.studentSchoolName,
          studentSchoolPeriod: item.studentSchoolPeriod,
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
      const database = drizzleDatabase.getInstance();
      await database.transaction(async (tx) => {
        await tx.update(informationalScreeningTable)
        .set({ isLatest: false })
        .where(eq(informationalScreeningTable.id, inputData.informationalId));
        // 1. Insere a nova versão herdando o registration e incrementando o version
        const [newScreening] = await tx
          .insert(informationalScreeningTable)
          .values({
            ...(inputData.informational as any), // Faz o cast se necessário para alinhar com o inferInsert
            registration: inputData.registration, // Mantém o elo do cadastro
            version: inputData.newVersion,        // Incrementa a versão (ex: 1 virá 2)
            isLatest: inputData.isLatest,         // true
            coAuthorId: inputData.coAuthorId,
            assigneeId: inputData.assigneeId,
          })
          .returning({ id: informationalScreeningTable.id });

        // 4. Insere os novos dados de membros da família vinculados à nova versão
        if (inputData.familyMembers && inputData.familyMembers.length > 0) {
          await tx.insert(familyMembersTable).values(
            inputData.familyMembers.map((member) => ({
              ...member,
              informationalScreeningId: newScreening.id,
            }))
          );
        }

        // 5. Insere a nova avaliação psicossocial vinculada à nova versão
        if (inputData.psychosocialEvaluation) {
          await tx.insert(psychosocialEvaluationsTable).values({
            ...inputData.psychosocialEvaluation,
            informationalScreeningId: newScreening.id,
          });
        }

        // 6. Insere os novos benefícios vinculados à nova versão
        if (inputData.benefits) {
          await tx.insert(benefitsTable).values({
            ...inputData.benefits,
            screeningId: newScreening.id,
          });
        }
      });
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