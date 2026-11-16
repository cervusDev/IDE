import { IBenefit, IFamilyMember, IInformationalScreening, IPsychosocialEvaluation } from "@shared/models/screenings";

export interface IInputData {
  familyMembers: IFamilyMember[];
  informational: IInformationalScreening;
  psychosocialEvaluation: IPsychosocialEvaluation;
  benefits: IBenefit
  assigneeId: string;
}