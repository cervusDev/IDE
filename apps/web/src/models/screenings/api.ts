import { Gender, HousingStatus } from ".";

export interface IFamilyMemberApiModel {
  full_name: string;
  age: number;
  relationship: string;
  educational_attainment: string | null;
  contact: string | null;
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
  student_gender_other: string | null;
  
  // Endereço e Contato
  street_address: string;
  neighborhood: string;
  
  // Dados da Mãe
  mother_name?: string;
  mother_age: number | null;
  mother_educational_attainment: string | null;
  mother_occupation?: string;
  mother_contact: string | null;
  
  // Dados do Pai
  father_name?: string;
  father_age: number | null;
  father_educational_attainment: string | null;
  father_occupation?: string;
  father_contact?: string;
  
  // Informações Socioeconômicas
  gross_household_income: string | null; // O Drizzle costuma retornar decimais como string por segurança de precisão
  parents_marital_status: string | null;
  legal_guardian_name: string | null;
  religion: string | null;
  housing_status: HousingStatus | null;
}

export interface IPsychosocialEvaluationApiModel {
  mental_health_history?: string ;
  pregnancy_and_birth?: string ;
  early_diet?: string ;
  current_diet?: string ;
  sleep_routine?: string ;
  psychomotor_development?: string ;
  speech_and_language?: string ;
  sphincter_control?: string ;
  childhood_diseases?: string ;
  medications?: string ;
  sexuality?: string ;
  schooling_history?: string ;
  tics_and_habits?: string ;
  daily_routine?: string ;
  participates_in_project?: string ;
  technology_access?: string ;
  substance_use?: string ;
  family_dynamics?: string ;
  assistant_description?: string ;
  guardian_perception?: string ;
  interview_observations?: string ;
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
  others_description?: string;
}