import { IBenefitWebModel, IFamilyMemberWebModel, IInformationalScreeningWebModel, IPsychosocialEvaluationWebModel } from "@/models/screenings/web";

export interface ICreateScreeningService {
  familyMembers: IFamilyMemberWebModel[];
  informational: IInformationalScreeningWebModel;
  psychosocialEvaluation: IPsychosocialEvaluationWebModel;
  benefits: IBenefitWebModel
}