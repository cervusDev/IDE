import { IBenefitApiModel, IFamilyMemberApiModel, IInformationalScreeningApiModel, IPsychosocialEvaluationApiModel } from "@/models/screenings/api";

export type ICreateRequestBody =  IInformationalScreeningApiModel & IPsychosocialEvaluationApiModel & IBenefitApiModel & {
  family_members: IFamilyMemberApiModel[];
}