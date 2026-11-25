import { Gender, HousingStatus } from ".";

export interface IFamilyMemberApiModel {
  full_name: string;
  age: number;
  relationship: string;
  educational_attainment: string;
  contact: string;
}

export interface IInformationalScreeningApiModel {
  health_unity: string;
  registration: string;
  nis?: string | null;
  assignee_id: string;
  
  // Dados do Aluno
  student_name: string;
  student_birth_date: string;
  student_color: string;
  student_age: number;
  student_ra: string;
  student_educational_attainment: string;
  student_school_name: string;
  student_school_period: string;
  student_gender: Gender;
  student_gender_other?: string | null;
  
  // Endereço e Contato
  street_address: string;
  neighborhood: string;
  
  // Dados da Mãe
  mother_name?: string | null;
  mother_age?: number | null;
  mother_educational_attainment?: string | null;
  mother_occupation?: string | null;
  mother_contact?: string | null;
  
  // Dados do Pai
  father_name?: string | null;
  father_age?: number | null;
  father_educational_attainment?: string | null;
  father_occupation?: string | null;
  father_contact?: string | null;
  
  // Informações Socioeconômicas
  gross_household_income: string;
  parents_marital_status: string;
  legal_guardian_name: string;
  religion: string;
  housing_status: HousingStatus;
}

export interface IPsychosocialEvaluationApiModel {
  mental_health_history?: string | null ;
  pregnancy_and_birth?: string | null ;
  early_diet?: string | null ;
  current_diet?: string | null ;
  sleep_routine?: string | null ;
  psychomotor_development?: string | null ;
  speech_and_language?: string | null ;
  sphincter_control?: string | null ;
  childhood_diseases?: string | null ;
  medications?: string | null ;
  sexuality?: string | null ;
  schooling_history?: string | null ;
  tics_and_habits?: string | null ;
  daily_routine?: string | null ;
  participates_in_project?: string | null ;
  technology_access?: string | null ;
  substance_use?: string | null ;
  family_dynamics?: string | null ;
  assistant_description?: string | null ;
  guardian_perception?: string | null ;
  interview_observations?: string | null ;
}

export interface IBenefitApiModel {
  // Transferência de Renda e Auxílios
  family_grant?: boolean;
  continuous_cash_benefit?: boolean;
  gas_aid?: boolean;
  birth_aid?: boolean;
  emergency_aid?: boolean;
  state_income_aid?: boolean;
  
  // Tarifas Sociais
  social_energy_tariff?: boolean;
  social_water_tariff?: boolean;
  
  // Educação e Infância
  pe_de_meia?: boolean;
  milk_program?: boolean;
  menstrual_dignity_program?: boolean;
  youth_id?: boolean;
  
  // Habitação
  social_rent?: boolean;
  social_housing?: boolean;
  green_grant?: boolean;
  
  // Acompanhamento Socioassistencial
  participates_in_paif?: boolean;
  participates_in_paefi?: boolean;
  child_labor_eradication?: boolean;
  
  // Isenções, Documentos e Transporte
  fee_exemption?: boolean;
  elderly_card?: boolean;
  free_transit?: boolean;
  inclusion_aid?: boolean;
  
  others?: boolean;
  others_description?: string | null;
}