CREATE TYPE "public"."gender_enum" AS ENUM('M', 'F', 'O');--> statement-breakpoint
ALTER TABLE "informational_screening" RENAME COLUMN "educational_attainment" TO "date";--> statement-breakpoint
ALTER TABLE "informational_screening" ADD COLUMN "student_educational_attainment" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "informational_screening" ADD COLUMN "student_school_name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "informational_screening" ADD COLUMN "student_school_period" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "informational_screening" ADD COLUMN "student_gender" "gender_enum" NOT NULL;--> statement-breakpoint
ALTER TABLE "informational_screening" ADD COLUMN "student_gender_other" varchar(100);--> statement-breakpoint
ALTER TABLE "informational_screening" DROP COLUMN "school_name";--> statement-breakpoint
ALTER TABLE "informational_screening" DROP COLUMN "school_period";