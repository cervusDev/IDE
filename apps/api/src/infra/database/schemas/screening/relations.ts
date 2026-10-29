import { relations } from 'drizzle-orm';
import { informationalScreeningTable } from './informationalScreening';
import { familyMembersTable } from './familyMembers';
import { psychosocialEvaluationsTable } from './psychosocialEvaluations';

export const informationalScreeningRelations = relations(
  informationalScreeningTable,
  ({ many, one }) => ({
    familyMembers: many(familyMembersTable),
    psychosocialEvaluation: one(psychosocialEvaluationsTable),
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