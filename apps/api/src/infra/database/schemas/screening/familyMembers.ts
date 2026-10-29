import {
  pgTable,
  uuid,
  varchar,
  integer,
  timestamp,
} from 'drizzle-orm/pg-core';
import { informationalScreeningTable } from './informationalScreening'; // import da tabela principal

export const familyMembersTable = pgTable('family_members', {
  id: uuid('id').defaultRandom().primaryKey(),

  // Chave Estrangeira ligando o parente ao cadastro do aluno
  informationalScreeningId: uuid('informational_screening_id')
    .notNull()
    .references(() => informationalScreeningTable.id, { onDelete: 'cascade' }),

  // Dados do parente
  fullName: varchar('full_name', { length: 255 }).notNull(),
  age: integer('age').notNull(),
  relationship: varchar('relationship', { length: 100 }).notNull(),
  educationalAttainment: varchar('educational_attainment', { length: 255 }),
  contact: varchar('contact', { length: 50 }),

  // Timestamps
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});