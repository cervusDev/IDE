import { benefitsTable, familyMembersTable, informationalScreeningTable, psychosocialEvaluationsTable } from "@infra/database/schemas";

type IInformationalScreeningInsert = typeof informationalScreeningTable.$inferInsert;

type IFamilyMemberInsert = Omit<typeof familyMembersTable.$inferInsert, 'informationalScreeningId'>;
type IPsychosocialEvaluationInsert = Omit<typeof psychosocialEvaluationsTable.$inferInsert, 'informationalScreeningId'>;
type IBenefitsInsert = Omit<typeof benefitsTable.$inferInsert, 'screeningId'>;

export interface IFindByIdOutputData {
  informational: IInformationalScreeningInsert;
  familyMembers: IFamilyMemberInsert[];
  psychosocialEvaluation: IPsychosocialEvaluationInsert;
  benefits: IBenefitsInsert;
}