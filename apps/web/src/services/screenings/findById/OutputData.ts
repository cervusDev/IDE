import { IBenefitWebModel, IFamilyMemberWebModel, IInformationalScreeningWebModel, IPsychosocialEvaluationWebModel } from "@/models/screenings/web";

export interface IFindScreeningByIdOutputData {
  familyMembers: IFamilyMemberWebModel[];
  informational: Omit<IInformationalScreeningWebModel, 'assigneeId'>;
  psychosocialEvaluation: IPsychosocialEvaluationWebModel;
  benefits: IBenefitWebModel
}