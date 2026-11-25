import { Gender, HousingStatus } from "@/models/screenings";
import { IBenefitApiModel, IFamilyMemberApiModel, IInformationalScreeningApiModel, IPsychosocialEvaluationApiModel } from "@/models/screenings/api";

export type ICreateRequestBody =  IInformationalScreeningApiModel & IPsychosocialEvaluationApiModel & IBenefitApiModel & {
  family_members: IFamilyMemberApiModel[];
}

export interface IListParams {
  health_unity?: string,
  nis?: string
  registration?: string
  student_name?: string
  student_age?: string
  ra?: string
  page?: string
  limit?: string
}

export interface IListResponseBody {
  list: {
    id: string;
    student_ra: string;
    student_name: string;
    nis: string;
    student_age: string;
    health_unity: string;
    registration: string;
    legal_guardian_name: string;
  }[]
  pagination: {
    limit: number;
    page: number;
    total: number;
  }
}

export interface IListVersionsParams {
  registration: string;
}

export interface IListVersionsResponseBody {
  list: {
    id: string;
    version: number;
    is_latest: boolean;
  }[]
}

export interface IFamilyMember {
  full_name: string;
  age: number;
  relationship: string;
  educational_attainment: string;
  contact: string;
}

export interface IFindByIdResponseBody {
  health_unity: string;
  registration: string;
  nis: string;
  student_name: string;
  student_birth_date: string;
  student_color: string;
  student_age: number;
  student_ra: string;
  student_educational_attainment: string;
  student_school_name: string;
  student_school_period: string;
  student_gender: Gender;
  student_gender_other: string | null;
  street_address: string;
  neighborhood: string;
  mother_name: string;
  mother_age: number;
  mother_educational_attainment: string;
  mother_occupation: string;
  mother_contact: string;
  father_name: string;
  father_age: number;
  father_educational_attainment: string;
  father_occupation: string;
  father_contact: string;
  gross_household_income: string;
  parents_marital_status: string;
  legal_guardian_name: string;
  religion: string;
  housing_status: HousingStatus;
  family_grant: boolean;
  continuous_cash_benefit: boolean;
  gas_aid: boolean;
  birth_aid: boolean;
  emergency_aid: boolean;
  state_income_aid: boolean;
  social_energy_tariff: boolean;
  social_water_tariff: boolean;
  pe_de_meia: boolean;
  milk_program: boolean;
  menstrual_dignity_program: boolean;
  youth_id: boolean;
  social_rent: boolean;
  social_housing: boolean;
  green_grant: boolean;
  participates_in_paif: boolean;
  participates_in_paefi: boolean;
  child_labor_eradication: boolean;
  fee_exemption: boolean;
  elderly_card: boolean;
  free_transit: boolean;
  inclusion_aid: boolean;
  others: boolean;
  others_description: string;
  family_members: IFamilyMember[];
  mental_health_history: string;
  childhood_diseases: string;
  medications: string;
  pregnancy_and_birth: string;
  early_diet: string;
  current_diet: string;
  sleep_routine: string;
  psychomotor_development: string;
  speech_and_language: string;
  sphincter_control: string;
  tics_and_habits: string;
  sexuality: string;
  schooling_history: string;
  daily_routine: string;
  participates_in_project: string;
  technology_access: string;
  substance_use: string;
  family_dynamics: string;
  assistant_description: string;
  guardian_perception: string;
  interview_observations: string;
}

export interface ICountResponseBody {
  count: number
}