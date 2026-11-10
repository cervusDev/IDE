ALTER TABLE "benefits" ADD COLUMN "others" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "benefits" ADD COLUMN "others_description" varchar(255);