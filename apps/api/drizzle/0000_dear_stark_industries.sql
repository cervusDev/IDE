CREATE TYPE "public"."housing_status" AS ENUM('ALUGADO', 'PRÓPRIO', 'CEDIDO');--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"password" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"email" varchar(255) NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "benefits" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"screening_id" uuid NOT NULL,
	"family_grant" boolean DEFAULT false NOT NULL,
	"continuous_cash_benefit" boolean DEFAULT false NOT NULL,
	"gas_aid" boolean DEFAULT false NOT NULL,
	"birth_aid" boolean DEFAULT false NOT NULL,
	"emergency_aid" boolean DEFAULT false NOT NULL,
	"state_income_aid" boolean DEFAULT false NOT NULL,
	"social_energy_tariff" boolean DEFAULT false NOT NULL,
	"social_water_tariff" boolean DEFAULT false NOT NULL,
	"pe_de_meia" boolean DEFAULT false NOT NULL,
	"milk_program" boolean DEFAULT false NOT NULL,
	"menstrual_dignity_program" boolean DEFAULT false NOT NULL,
	"youth_id" boolean DEFAULT false NOT NULL,
	"social_rent" boolean DEFAULT false NOT NULL,
	"social_housing" boolean DEFAULT false NOT NULL,
	"green_grant" boolean DEFAULT false NOT NULL,
	"participates_in_paif" boolean DEFAULT false NOT NULL,
	"participates_in_paefi" boolean DEFAULT false NOT NULL,
	"child_labor_eradication" boolean DEFAULT false NOT NULL,
	"fee_exemption" boolean DEFAULT false NOT NULL,
	"elderly_card" boolean DEFAULT false NOT NULL,
	"free_transit" boolean DEFAULT false NOT NULL,
	"inclusion_aid" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "benefits_screening_id_unique" UNIQUE("screening_id")
);
--> statement-breakpoint
CREATE TABLE "family_members" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"informational_screening_id" uuid NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"age" integer NOT NULL,
	"relationship" varchar(100) NOT NULL,
	"educational_attainment" varchar(255),
	"contact" varchar(50),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "informational_screening" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"health_unity" varchar(255) NOT NULL,
	"registration" varchar(50) NOT NULL,
	"nis" varchar(11) NOT NULL,
	"student_name" varchar(255) NOT NULL,
	"student_birth_date" varchar(10) NOT NULL,
	"student_color" varchar(50) NOT NULL,
	"student_age" integer NOT NULL,
	"student_ra" varchar(50) NOT NULL,
	"educational_attainment" varchar(255) NOT NULL,
	"school_name" text NOT NULL,
	"school_period" varchar(100) NOT NULL,
	"street_address" varchar(255) NOT NULL,
	"neighborhood" varchar(255) NOT NULL,
	"mother_name" varchar(255) NOT NULL,
	"mother_age" integer,
	"mother_educational_attainment" varchar(255),
	"mother_occupation" varchar(255),
	"mother_contact" varchar(50),
	"father_name" varchar(255),
	"father_age" integer,
	"father_educational_attainment" varchar(255),
	"father_occupation" varchar(255),
	"father_contact" varchar(50),
	"gross_household_income" numeric(10, 2),
	"parents_marital_status" varchar(50),
	"legal_guardian_name" varchar(255),
	"religion" varchar(100),
	"housing_status" "housing_status",
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "informational_screening_nis_unique" UNIQUE("nis"),
	CONSTRAINT "informational_screening_student_ra_unique" UNIQUE("student_ra")
);
--> statement-breakpoint
CREATE TABLE "psychosocial_evaluations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"informational_screening_id" uuid NOT NULL,
	"mental_health_history" text,
	"pregnancy_and_birth" text,
	"early_diet" text,
	"current_diet" text,
	"sleep_routine" text,
	"psychomotor_development" text,
	"speech_and_language" text,
	"sphincter_control" text,
	"childhood_diseases" text,
	"medications" text,
	"sexuality" text,
	"schooling_history" text,
	"tics_and_habits" text,
	"daily_routine" text,
	"participates_in_project" text,
	"technology_access" text,
	"substance_use" text,
	"family_dynamics" text,
	"assistant_description" text,
	"guardian_perception" text,
	"interview_observations" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "benefits" ADD CONSTRAINT "benefits_screening_id_informational_screening_id_fk" FOREIGN KEY ("screening_id") REFERENCES "public"."informational_screening"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "family_members" ADD CONSTRAINT "family_members_informational_screening_id_informational_screening_id_fk" FOREIGN KEY ("informational_screening_id") REFERENCES "public"."informational_screening"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "psychosocial_evaluations" ADD CONSTRAINT "psychosocial_evaluations_informational_screening_id_informational_screening_id_fk" FOREIGN KEY ("informational_screening_id") REFERENCES "public"."informational_screening"("id") ON DELETE cascade ON UPDATE no action;