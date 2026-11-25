import { Gender, HousingStatus } from ".";

export interface IFamilyMemberWebModel {
  fullName: string;
  age: number;
  relationship: string;
  educationalAttainment: string;
  contact: string;
}

export interface IInformationalScreeningWebModel {
  healthUnity: string;
  registration: string;
  nis?: string | null;
  assigneeId: string;
  
  // Dados do Aluno
  studentName: string;
  studentBirthDate: string;
  studentColor: string;
  studentAge: number;
  studentRa: string;
  studentEducationalAttainment: string;
  studentSchoolName: string;
  studentSchoolPeriod: string;
  studentGender: Gender;
  studentGenderOther?: string | null;
  
  // Endereço e Contato
  streetAddress: string;
  neighborhood: string;
  
  // Dados da Mãew
  motherName?: string | null;
  motherAge: number | null;
  motherEducationalAttainment?: string | null;
  motherOccupation?: string | null;
  motherContact?: string | null;
  
  // Dados do Pai
  fatherName?: string | null;
  fatherAge: number | null;
  fatherEducationalAttainment?: string | null;
  fatherOccupation?: string | null;
  fatherContact?: string | null;
  
  // Informações Socioeconômicas
  grossHouseholdIncome: string;
  legalGuardianName: string;
  religion: string;
  parentsMaritalStatus: string;
  housingStatus: HousingStatus;
}

export interface IPsychosocialEvaluationWebModel {
  mentalHealthHistory?: string ;
  pregnancyAndBirth?: string ;
  earlyDiet?: string ;
  currentDiet?: string ;
  sleepRoutine?: string ;
  psychomotorDevelopment?: string ;
  speechAndLanguage?: string ;
  sphincterControl?: string ;
  childhoodDiseases?: string ;
  medications?: string ;
  sexuality?: string ;
  schoolingHistory?: string ;
  ticsAndHabits?: string ;
  dailyRoutine?: string ;
  participatesInProject?: string ;
  technologyAccess?: string ;
  substanceUse?: string ;
  familyDynamics?: string ;
  assistantDescription?: string ;
  guardianPerception?: string ;
  interviewObservations?: string ;
}

export interface IBenefitWebModel {
  // Transferência de Renda e Auxílios
  familyGrant?: boolean;
  continuousCashBenefit?: boolean;
  gasAid?: boolean;
  birthAid?: boolean;
  emergencyAid?: boolean;
  stateIncomeAid?: boolean;
  
  // Tarifas Sociais
  socialEnergyTariff?: boolean;
  socialWaterTariff?: boolean;
  
  // Educação e Infância
  peDeMeia?: boolean;
  milkProgram?: boolean;
  menstrualDignityProgram?: boolean;
  youthId?: boolean;
  
  // Habitação
  socialRent?: boolean;
  socialHousing?: boolean;
  greenGrant?: boolean;
  
  // Acompanhamento Socioassistencial
  participatesInPaif?: boolean;
  participatesInPaefi?: boolean;
  childLaborEradication?: boolean;
  
  // Isenções, Documentos e Transporte
  feeExemption?: boolean;
  elderlyCard?: boolean;
  freeTransit?: boolean;
  inclusionAid?: boolean;
  
  others?: boolean;
  othersDescription?: string;
}