import { and, count, eq, ilike, SQL } from 'drizzle-orm';
import DrizzleORMError from "@infra/database/errors/DrizzleORMError";
import { ICreateInformationalScreeningInputData } from "./dtos/createInformationalScreening/InputData";
import { IDeleteInformationalScreeningInputData } from "./dtos/deleteInformationalScreening/InputData";
import { IFindByIdInputData } from "./dtos/findById/InputData";
import { IFindByIdOutputData } from "./dtos/findById/Output";
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
import { IFindInformationalScreeningByRegistrationInputData } from './dtos/findInformationalScreeningByRegistration/InputData';
import { IFindInformationalScreeningByRegistrationOutputData } from './dtos/findInformationalScreeningByRegistration/OutputData';
import { IListByRegistrationInputData } from './dtos/listByRegistration/InputData';
import { IListByRegistrationOutputData } from './dtos/listByRegistration/OutputData';

export class ScreeningRepositoryDatabase implements IScreeningRepository {
  public async listByRegistration(inputData: IListByRegistrationInputData): Promise<IListByRegistrationOutputData> {
    try {
      const database = drizzleDatabase.getInstance();
      const screenings = await database.select()
        .from(informationalScreeningTable)
        .where(eq(informationalScreeningTable.registration, inputData.registration))
      const output: IListByRegistrationOutputData = {
        list: screenings.map(item => ({
          id: item.id,
          version: item.version,
          isLatest: item.isLatest
        }))
      }
      return output;
    } catch (err) {
      throw new DrizzleORMError(JSON.stringify(err));
    }
  }
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
  public async countInformationalScreening(inputData: ICountInformationalScreeningInputData): Promise<ICountInformationalScreeningOutputData> {
    try {
      const whereConditions: SQL[] = [];
      if (inputData.filters?.healthUnity) {
        whereConditions.push(ilike(informationalScreeningTable.healthUnity, `%${inputData.filters.healthUnity}%`));
      }
      if (inputData.filters?.nis) {
        whereConditions.push(ilike(informationalScreeningTable.nis, `%${inputData.filters.nis}%`));
      }
      if (inputData.filters?.registration) {
        whereConditions.push(ilike(informationalScreeningTable.registration, `%${inputData.filters.registration}%`));
      }
      if (inputData.filters?.studentName) {
        whereConditions.push(ilike(informationalScreeningTable.studentName, `%${inputData.filters.studentName}%`));
      }

      // CORREÇÃO CRUCIAL: Verifica se é diferente de undefined, não é null e NÃO É NaN
      if (inputData.filters?.studentAge !== undefined && inputData.filters?.studentAge !== null && !isNaN(Number(inputData.filters.studentAge))) {
        whereConditions.push(eq(informationalScreeningTable.studentAge, Number(inputData.filters.studentAge)));
      }

      if (inputData.filters?.ra) {
        whereConditions.push(ilike(informationalScreeningTable.studentRa, `%${inputData.filters.ra}%`));
      }
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
      console.log('count', err)
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
  public async findById(inputData: IFindByIdInputData): Promise<IFindByIdOutputData> {
    try {
      const database = drizzleDatabase.getInstance();
      // 1. Busca rápida apenas da triagem principal e relações 1:1 / Joins simples de usuários
      const [mainResultQuery, familyMembers] = await Promise.all([
        database
          .select({
            informational: informationalScreeningTable,
            psychosocialEvaluation: psychosocialEvaluationsTable,
            benefits: benefitsTable,
            assignee: usersTable,
          })
          .from(informationalScreeningTable)
          .leftJoin(psychosocialEvaluationsTable, eq(psychosocialEvaluationsTable.informationalScreeningId, informationalScreeningTable.id))
          .leftJoin(benefitsTable, eq(benefitsTable.screeningId, informationalScreeningTable.id))
          .leftJoin(usersTable, eq(informationalScreeningTable.assigneeId, usersTable.id))
          .where(eq(informationalScreeningTable.id, inputData.id)),

        database
          .select()
          .from(familyMembersTable)
          .where(eq(familyMembersTable.informationalScreeningId, inputData.id))
      ]);
      const result = mainResultQuery[0];

      const output: IFindByIdOutputData = {
        informational: result.informational,
        benefits: result.benefits!,
        familyMembers,
        psychosocialEvaluation: result.psychosocialEvaluation! 
      };

      return output;
    } catch (err) {
      throw new DrizzleORMError(JSON.stringify(err));
    }
  }
  public async listInformationalScreening(inputData: IListInformationScreeningInputData): Promise<IListInformationalScreeningOutput> {
    try {
      const whereConditions: SQL[] = [];
      if (inputData.filters?.healthUnity) {
        whereConditions.push(ilike(informationalScreeningTable.healthUnity, `%${inputData.filters.healthUnity}%`));
      }
      if (inputData.filters?.nis) {
        whereConditions.push(ilike(informationalScreeningTable.nis, `%${inputData.filters.nis}%`));
      }
      if (inputData.filters?.registration) {
        whereConditions.push(ilike(informationalScreeningTable.registration, `%${inputData.filters.registration}%`));
      }
      if (inputData.filters?.studentName) {
        whereConditions.push(ilike(informationalScreeningTable.studentName, `%${inputData.filters.studentName}%`));
      }

      // CORREÇÃO CRUCIAL: Verifica se é diferente de undefined, não é null e NÃO É NaN
      if (inputData.filters?.studentAge !== undefined && inputData.filters?.studentAge !== null && !isNaN(Number(inputData.filters.studentAge))) {
        whereConditions.push(eq(informationalScreeningTable.studentAge, Number(inputData.filters.studentAge)));
      }

      if (inputData.filters?.ra) {
        whereConditions.push(ilike(informationalScreeningTable.studentRa, `%${inputData.filters.ra}%`));
      }
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
        })),
        page: {
          limit: limit,
        }
      }
      return output;
    } catch (err) {
      console.log("list", err)
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
        .where(eq(informationalScreeningTable.registration, inputData.registration));
    } catch (err) {
      throw new DrizzleORMError(JSON.stringify(err));
    }
  }
}