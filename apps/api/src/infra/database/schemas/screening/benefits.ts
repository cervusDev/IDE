import { pgTable, uuid, boolean, timestamp } from 'drizzle-orm/pg-core';
import { informationalScreeningTable } from './informationalScreening';

export const benefitsTable = pgTable('benefits', {
  id: uuid('id').defaultRandom().primaryKey(),
  
  // Chave estrangeira ligando à triagem do aluno (Relação 1 para 1)
  screeningId: uuid('screening_id')
    .notNull()
    .references(() => informationalScreeningTable.id, { onDelete: 'cascade' })
    .unique(),

  // ==========================================
  // 1. TRANSFERÊNCIA DE RENDA E AUXÍLIOS DIRETOS
  // ==========================================
  familyGrant: boolean('family_grant').default(false).notNull(), // Bolsa Família
  continuousCashBenefit: boolean('continuous_cash_benefit').default(false).notNull(), // BPC (Benefício de Prestação Continuada - Idoso/PCD)
  gasAid: boolean('gas_aid').default(false).notNull(), // Auxílio Gás / Vale-Gás
  birthAid: boolean('birth_aid').default(false).notNull(), // Auxílio-Natalidade
  emergencyAid: boolean('emergency_aid').default(false).notNull(), // Auxílio Emergencial
  stateIncomeAid: boolean('state_income_aid').default(false).notNull(), // Renda Cidadã / Programas estaduais de renda

  // ==========================================
  // 2. TARIFAS SOCIAIS E SERVIÇOS BÁSICOS
  // ==========================================
  socialEnergyTariff: boolean('social_energy_tariff').default(false).notNull(), // Tarifa Social de Energia Elétrica
  socialWaterTariff: boolean('social_water_tariff').default(false).notNull(), // Tarifa Social de Água e Esgoto

  // ==========================================
  // 3. EDUCAÇÃO, INFÂNCIA E JUVENTUDE
  // ==========================================
  peDeMeia: boolean('pe_de_meia').default(false).notNull(), // Pé-de-Meia (Poupança Ensino Médio)
  milkProgram: boolean('milk_program').default(false).notNull(), // Viva Leite / Programa de distribuição de leite
  menstrualDignityProgram: boolean('menstrual_dignity_program').default(false).notNull(), // Programa Dignidade Menstrual
  youthId: boolean('youth_id').default(false).notNull(), // ID Jovem

  // ==========================================
  // 4. HABITAÇÃO E INFRAESTRUTURA
  // ==========================================
  socialRent: boolean('social_rent').default(false).notNull(), // Aluguel Social / Auxílio-moradia
  socialHousing: boolean('social_housing').default(false).notNull(), // Minha Casa, Minha Vida
  greenGrant: boolean('green_grant').default(false).notNull(), // Bolsa Verde (Apoio à conservação ambiental)

  // ==========================================
  // 5. ACOMPANHAMENTO SOCIOASSISTENCIAL (CRAS/CREAS)
  // ==========================================
  participatesInPaif: boolean('participates_in_paif').default(false).notNull(), // Serviço PAIF (Proteção e Atendimento Integral à Família)
  participatesInPaefi: boolean('participates_in_paefi').default(false).notNull(), // Serviço PAEFI (Proteção e Atendimento Especializado)
  childLaborEradication: boolean('child_labor_eradication').default(false).notNull(), // PETI (Erradicação do Trabalho Infantil)

  // ==========================================
  // 6. ISENÇÕES, DOCUMENTOS E TRANSPORTE
  // ==========================================
  feeExemption: boolean('fee_exemption').default(false).notNull(), // Isenção de taxas (concursos/vestibulares/documentos)
  elderlyCard: boolean('elderly_card').default(false).notNull(), // Carteira da Pessoa Idosa
  freeTransit: boolean('free_transit').default(false).notNull(), // Passe Livre (transporte)
  inclusionAid: boolean('inclusion_aid').default(false).notNull(), // Auxílio-Inclusão (PCD no mercado de trabalho)

  // Timestamps de Controle
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});