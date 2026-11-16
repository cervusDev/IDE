import { IBenefit, IFamilyMember, IInformationalScreening, IPsychosocialEvaluation } from "@shared/models/screenings";

interface IUpdateDTO {
  familyMembers: IFamilyMember[];
  informational: IInformationalScreening;
  psychosocialEvaluation: IPsychosocialEvaluation;
  benefits: IBenefit
}

export type InputData = Partial<IUpdateDTO> & {
  registration: string
  coAuthorId: string;
}