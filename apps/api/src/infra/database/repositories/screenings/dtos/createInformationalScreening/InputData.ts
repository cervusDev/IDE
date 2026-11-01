import { benefitsTable, familyMembersTable, informationalScreeningTable, psychosocialEvaluationsTable } from "@infra/database/schemas";

export type IInformationalScreeningInsert = typeof informationalScreeningTable.$inferInsert;

export type IFamilyMemberInsert = Omit<typeof familyMembersTable.$inferInsert, 'informationalScreeningId'>;
export type IPsychosocialEvaluationInsert = Omit<typeof psychosocialEvaluationsTable.$inferInsert, 'informationalScreeningId'>;
export type IBenefitsInsert = Omit<typeof benefitsTable.$inferInsert, 'screeningId'>;

export interface ICreateInformationalScreeningInputData {
  informational: IInformationalScreeningInsert;
  familyMembers?: IFamilyMemberInsert[];
  psychosocialEvaluation?: IPsychosocialEvaluationInsert;
  benefits?: IBenefitsInsert;
}