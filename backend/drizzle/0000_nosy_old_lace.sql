CREATE TYPE "public"."Role" AS ENUM('USER', 'AUTHOR', 'ADMIN');--> statement-breakpoint
CREATE TABLE "article" (
	"id" text PRIMARY KEY NOT NULL,
	"authorId" text NOT NULL,
	"title" text NOT NULL,
	"subtitle" text NOT NULL,
	"description" text NOT NULL,
	"content" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"image" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "comment" (
	"id" text PRIMARY KEY NOT NULL,
	"articleId" text NOT NULL,
	"authorId" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"content" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "token" (
	"name" text PRIMARY KEY NOT NULL,
	"value" text NOT NULL,
	"expiresAt" text NOT NULL,
	"refreshedAt" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"role" "Role" DEFAULT 'USER' NOT NULL,
	CONSTRAINT "user_name_unique" UNIQUE("name"),
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
