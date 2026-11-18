import { IBenefitsInsert, ICreateInformationalScreeningInputData, IFamilyMemberInsert, IInformationalScreeningInsert, IPsychosocialEvaluationInsert } from "../createInformationalScreening/InputData";

export type IUpdateInformationalScreeningInputData = {
  informational: Partial<IInformationalScreeningInsert>;
  familyMembers?: Partial<IFamilyMemberInsert[]>;
  psychosocialEvaluation?: Partial<IPsychosocialEvaluationInsert>;
  benefits?: Partial<IBenefitsInsert>;
  registration: string;
  newVersion: number
  informationalId: string;
  assigneeId: string;
  isLatest: boolean;
  coAuthorId: string;
}