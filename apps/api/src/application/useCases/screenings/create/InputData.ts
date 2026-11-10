export interface IFamilyMember {
  fullName: string;
  age: number;
  relationship: string;
  educationalAttainment: string | null;
  contact: string | null;
}

export type HousingStatus = 'ALUGADO' | 'PRÓPRIO' | 'CEDIDO';
export type Gender = 'M' | 'F' | 'O';

export interface IInformationalScreening {
  healthUnity: string;
  registration: string;
  nis?: string | null;
  
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
  studentGenderOther: string | null;
  
  // Endereço e Contato
  streetAddress: string;
  neighborhood: string;
  
  // Dados da Mãe
  motherName: string | null;
  motherAge: number | null;
  motherEducationalAttainment: string | null;
  motherOccupation: string | null;
  motherContact: string | null;
  
  // Dados do Pai
  fatherName: string | null;
  fatherAge: number | null;
  fatherEducationalAttainment: string | null;
  fatherOccupation: string | null;
  fatherContact: string | null;
  
  // Informações Socioeconômicas
  grossHouseholdIncome: string | null; // O Drizzle costuma retornar decimais como string por segurança de precisão
  parentsMaritalStatus: string | null;
  legalGuardianName: string | null;
  religion: string | null;
  housingStatus: HousingStatus | null;
}

export interface IPsychosocialEvaluation {
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
  createdAt?: Date;
  updatedAt?: Date;
}


export interface IBenefit {
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

export interface IInputData {
  familyMembers: IFamilyMember[];
  informational: IInformationalScreening;
  psychosocialEvaluation: IPsychosocialEvaluation;
  benefits: IBenefit
}