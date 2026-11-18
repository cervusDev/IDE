import { IBenefit, IFamilyMember, IInformationalScreening, IPsychosocialEvaluation } from "@shared/models/screenings";

export interface IOutputData {
  familyMembers: IFamilyMember[];
  informational: IInformationalScreening;
  psychosocialEvaluation: IPsychosocialEvaluation;
  benefits: IBenefit
}