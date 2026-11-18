import { genderEnumSchemaValues, housingStatusSchemaValues } from '@shared/models/screenings';
import { z } from 'zod';

export const findScreeningByIdControllerParamsSchema = z.object({
  id: z.string(),
});

export type FindScreeningByIdControllerParamsSchema = z.infer<
  typeof findScreeningByIdControllerParamsSchema
>;

export const findScreeningByIdControllerResponseSchema = z.object({
    // ==========================================
    // ETAPA 1: Dados Pessoais e Informações Principais
    // ==========================================
    health_unity: z.string().min(1, 'A unidade de saúde é obrigatória'),
    registration: z.string().min(1, 'A matrícula é obrigatória'),
    nis: z.string().optional().nullable(),
  
    // Dados do Aluno
    student_name: z.string().min(1, 'O nome do aluno é obrigatório'),
    student_birth_date: z.string().min(10, 'A data de nascimento deve ter o formato DD/MM/AAAA').max(10, 'A data de nascimento deve ter o formato DD/MM/AAAA'),
    student_color: z.string().min(1, 'A cor/raça do aluno é obrigatória'),
    student_age: z.number({ message: 'A idade do aluno é obrigatória' }),
    student_ra: z.string().min(1, 'O número do RA é obrigatório'),
    student_educational_attainment: z.string().min(1, 'A escolaridade do aluno é obrigatória'),
    student_school_name: z.string().min(1, 'O nome da escola do aluno é obrigatório'),
    student_school_period: z.string().min(1, 'O período escolar do aluno é obrigatório'),
    student_gender: z.enum(genderEnumSchemaValues, {
      message: 'Selecione um tipo de gênero válido',
    }),
    student_gender_other: z.string().optional().nullable(),
  
    // Endereço
    street_address: z.string().min(1, 'O endereço da família é obrigatório'),
    neighborhood: z.string().min(1, 'O bairro é obrigatório'),
  
    // Dados da Mãe (Opcionais)
    mother_name: z.string().optional().nullable(),
    mother_age: z.coerce.number().optional().nullable(),
    mother_educational_attainment: z.string().optional().nullable(),
    mother_occupation: z.string().optional().nullable(),
    mother_contact: z.string().optional().nullable(),
  
    // Dados do Pai (Opcionais)
    father_name: z.string().optional().nullable(),
    father_age: z.coerce.number().optional().nullable(),
    father_educational_attainment: z.string().optional().nullable(),
    father_occupation: z.string().optional().nullable(),
    father_contact: z.string().optional().nullable(),
  
    // Contexto Socioeconômico e Familiar
    gross_household_income: z.coerce
      .string({ message: 'A renda bruta familiar é obrigatória' }).optional().nullable(),
    parents_marital_status: z.string().optional().nullable(),
    legal_guardian_name: z.string().optional().nullable(),
    religion: z.string().optional().nullable(),
    housing_status: z.enum(housingStatusSchemaValues, {
      message: 'Selecione um tipo de moradia válido',
    }),
  
    // ==========================================
    // ETAPA 2: Benefícios e Auxílios
    // ==========================================
    family_grant: z.boolean().default(false).optional().nullable(),
    continuous_cash_benefit: z.boolean().default(false).optional().nullable(),
    gas_aid: z.boolean().default(false).optional().nullable(),
    birth_aid: z.boolean().default(false).optional().nullable(),
    emergency_aid: z.boolean().default(false).optional().nullable(),
    state_income_aid: z.boolean().default(false).optional().nullable(),
  
    social_energy_tariff: z.boolean().default(false).optional().nullable(),
    social_water_tariff: z.boolean().default(false).optional().nullable(),
  
    pe_de_meia: z.boolean().default(false).optional().nullable(),
    milk_program: z.boolean().default(false).optional().nullable(),
    menstrual_dignity_program: z.boolean().default(false).optional().nullable(),
    youth_id: z.boolean().default(false).optional().nullable(),
  
    social_rent: z.boolean().default(false).optional().nullable(),
    social_housing: z.boolean().default(false).optional().nullable(),
    green_grant: z.boolean().default(false).optional().nullable(),
  
    participates_in_paif: z.boolean().default(false).optional().nullable(),
    participates_in_paefi: z.boolean().default(false).optional().nullable(),
    child_labor_eradication: z.boolean().default(false).optional().nullable(),
  
    fee_exemption: z.boolean().default(false).optional().nullable(),
    elderly_card: z.boolean().default(false).optional().nullable(),
    free_transit: z.boolean().default(false).optional().nullable(),
    inclusion_aid: z.boolean().default(false).optional().nullable(),
  
    others: z.boolean().default(false).optional().nullable(),
    others_description: z.string().optional().or(z.literal('')).nullable(),
  
    // ==========================================
    // ETAPA 3: Membros da Família
    // ==========================================
    family_members: z.array(
      z.object({
        full_name: z.string().min(1, 'O nome completo é obrigatório').max(255),
        age: z.number().min(1, 'A idade é obrigatória'),
        relationship: z.string().min(1, 'O grau de parentesco é obrigatório').max(100),
        educational_attainment: z.string().max(255).optional().or(z.literal('')).nullable(),
        contact: z.string().max(50).optional().or(z.literal('')).nullable(),
      })
    ).min(1, 'Adicione pelo menos um membro familiar.'),
  
    // ==========================================
    // ETAPA 4: Avaliação Psicossocial
    // ==========================================
    mental_health_history: z.string().optional().nullable(),
    childhood_diseases: z.string().optional().nullable(),
    medications: z.string().optional().nullable(),
    pregnancy_and_birth: z.string().optional().nullable(),
    early_diet: z.string().optional().nullable(),
    current_diet: z.string().optional().nullable(),
    sleep_routine: z.string().optional().nullable(),
    psychomotor_development: z.string().optional().nullable(),
    speech_and_language: z.string().optional().nullable(),
    sphincter_control: z.string().optional().nullable(),
    tics_and_habits: z.string().optional().nullable(),
    sexuality: z.string().optional().nullable(),
    schooling_history: z.string().optional().nullable(),
    daily_routine: z.string().optional().nullable(),
    participates_in_project: z.string().optional().nullable(),
    technology_access: z.string().optional().nullable(),
    substance_use: z.string().optional().nullable(),
    family_dynamics: z.string().optional().nullable(),
    assistant_description: z.string().optional().nullable(),
    guardian_perception: z.string().optional().nullable(),
    interview_observations: z.string().optional().nullable(),
});

export type FindScreeningByIdControllerResponseSchema = z.infer<
  typeof findScreeningByIdControllerResponseSchema
>;
