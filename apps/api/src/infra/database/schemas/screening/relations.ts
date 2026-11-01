import { relations } from 'drizzle-orm';
import { informationalScreeningTable } from './informationalScreening';
import { familyMembersTable } from './familyMembers';
import { psychosocialEvaluationsTable } from './psychosocialEvaluations';
import { benefitsTable } from './benefits';

export const informationalScreeningRelations = relations(
  informationalScreeningTable,
  ({ many, one }) => ({
    familyMembers: many(familyMembersTable),
    psychosocialEvaluation: one(psychosocialEvaluationsTable),
    benefits: one(benefitsTable)
  })
);

export const familyMembersRelations = relations(
  familyMembersTable,
  ({ one }) => ({
    informationalScreening: one(informationalScreeningTable, {
      fields: [familyMembersTable.informationalScreeningId],
      references: [informationalScreeningTable.id],
    }),
  })
);

export const psychosocialEvaluationsRelations = relations(
  psychosocialEvaluationsTable,
  ({ one }) => ({
    informationalScreening: one(informationalScreeningTable, {
      fields: [psychosocialEvaluationsTable.informationalScreeningId],
      references: [informationalScreeningTable.id],
    }),
  })
);

export const benefitsRelations = relations(
  benefitsTable,
  ({ one }) => ({
    informationalScreening: one(informationalScreeningTable, {
      fields: [benefitsTable.screeningId],
      references: [informationalScreeningTable.id],
    }),
  })
);