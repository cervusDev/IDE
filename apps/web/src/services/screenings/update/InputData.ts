import { IFamilyMemberWebModel, IInformationalScreeningWebModel, IPsychosocialEvaluationWebModel, IBenefitWebModel } from "@/models/screenings/web";

export interface IUpdateDTO {
  familyMembers: IFamilyMemberWebModel[];
  informational: IInformationalScreeningWebModel;
  psychosocialEvaluation: IPsychosocialEvaluationWebModel;
  benefits: IBenefitWebModel
}

export interface IUpdateScreeningInputData extends Partial<IUpdateDTO> {
  registration: string;
  coAuthorId: string;
}