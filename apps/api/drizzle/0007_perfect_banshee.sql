ALTER TABLE "informational_screening" ADD COLUMN "version" integer DEFAULT 1 NOT NULL;--> statement-breakpoint
ALTER TABLE "informational_screening" ADD COLUMN "is_latest" boolean DEFAULT true NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX "unique_registration_version" ON "informational_screening" USING btree ("registration","version");--> statement-breakpoint
CREATE UNIQUE INDEX "unique_latest_screening_per_registration" ON "informational_screening" USING btree ("registration") WHERE "informational_screening"."is_latest" = true;--> statement-breakpoint
ALTER TABLE "informational_screening" ADD CONSTRAINT "informational_screening_registration_unique" UNIQUE("registration");