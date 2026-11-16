import { Gender, HousingStatus } from ".";

export interface IFamilyMemberWebModel {
  fullName: string;
  age: string;
  relationship: string;
  educationalAttainment: string;
  contact: string | null;
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
  studentAge: string;
  studentRa: string;
  studentEducationalAttainment: string;
  studentSchoolName: string;
  studentSchoolPeriod: string;
  studentGender: Gender;
  studentGenderOther?: string;
  
  // Endereço e Contato
  streetAddress: string;
  neighborhood: string;
  
  // Dados da Mãew
  motherName?: string;
  motherAge: number | null;
  motherEducationalAttainment: string | null;
  motherOccupation?: string;
  motherContact: string | null;
  
  // Dados do Pai
  fatherName?: string;
  fatherAge: number | null;
  fatherEducationalAttainment: string | null;
  fatherOccupation?: string;
  fatherContact?: string;
  
  // Informações Socioeconômicas
  grossHouseholdIncome: string | null; // O Drizzle costuma retornar decimais como string por segurança de precisão
  parentsMaritalStatus: string | null;
  legalGuardianName: string | null;
  religion: string | null;
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