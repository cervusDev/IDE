ALTER TABLE "informational_screening" DROP CONSTRAINT "informational_screening_nis_unique";--> statement-breakpoint
DROP INDEX "unique_latest_screening_per_registration";--> statement-breakpoint
CREATE INDEX "unique_latest_screening_per_registration" ON "informational_screening" USING btree ("registration") WHERE "informational_screening"."is_latest" = true;