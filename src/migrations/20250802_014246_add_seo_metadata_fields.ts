import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_site_settings_locale" AS ENUM('en_US', 'es_US');
  CREATE TYPE "public"."enum_site_settings_twitter_card_type" AS ENUM('summary', 'summary_large_image');
  ALTER TABLE "site_settings" ADD COLUMN "site_url" varchar DEFAULT 'https://rpmdetail.co';
  ALTER TABLE "site_settings" ADD COLUMN "site_description" varchar DEFAULT 'Transform your vehicle with RPM Detailing''s premium auto detailing services in Boise. Ceramic coating, paint correction, and full interior/exterior detailing.';
  ALTER TABLE "site_settings" ADD COLUMN "keywords" varchar DEFAULT 'auto detailing, car detailing, ceramic coating, paint correction, Boise, Idaho, RPM Detailing';
  ALTER TABLE "site_settings" ADD COLUMN "location_city" varchar DEFAULT 'Boise';
  ALTER TABLE "site_settings" ADD COLUMN "location_state" varchar DEFAULT 'ID';
  ALTER TABLE "site_settings" ADD COLUMN "location_country" varchar DEFAULT 'USA';
  ALTER TABLE "site_settings" ADD COLUMN "theme_color" varchar DEFAULT '#D9232D';
  ALTER TABLE "site_settings" ADD COLUMN "locale" "enum_site_settings_locale" DEFAULT 'en_US';
  ALTER TABLE "site_settings" ADD COLUMN "open_graph_default_image_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "open_graph_image_width" numeric DEFAULT 1200;
  ALTER TABLE "site_settings" ADD COLUMN "open_graph_image_height" numeric DEFAULT 630;
  ALTER TABLE "site_settings" ADD COLUMN "twitter_handle" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "twitter_card_type" "enum_site_settings_twitter_card_type" DEFAULT 'summary_large_image';
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_open_graph_default_image_id_media_id_fk" FOREIGN KEY ("open_graph_default_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "site_settings_open_graph_open_graph_default_image_idx" ON "site_settings" USING btree ("open_graph_default_image_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_open_graph_default_image_id_media_id_fk";
  
  DROP INDEX "site_settings_open_graph_open_graph_default_image_idx";
  ALTER TABLE "site_settings" DROP COLUMN "site_url";
  ALTER TABLE "site_settings" DROP COLUMN "site_description";
  ALTER TABLE "site_settings" DROP COLUMN "keywords";
  ALTER TABLE "site_settings" DROP COLUMN "location_city";
  ALTER TABLE "site_settings" DROP COLUMN "location_state";
  ALTER TABLE "site_settings" DROP COLUMN "location_country";
  ALTER TABLE "site_settings" DROP COLUMN "theme_color";
  ALTER TABLE "site_settings" DROP COLUMN "locale";
  ALTER TABLE "site_settings" DROP COLUMN "open_graph_default_image_id";
  ALTER TABLE "site_settings" DROP COLUMN "open_graph_image_width";
  ALTER TABLE "site_settings" DROP COLUMN "open_graph_image_height";
  ALTER TABLE "site_settings" DROP COLUMN "twitter_handle";
  ALTER TABLE "site_settings" DROP COLUMN "twitter_card_type";
  DROP TYPE "public"."enum_site_settings_locale";
  DROP TYPE "public"."enum_site_settings_twitter_card_type";`)
}
