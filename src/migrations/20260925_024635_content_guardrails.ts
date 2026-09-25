import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "services" ALTER COLUMN "price" SET DATA TYPE numeric USING NULLIF(regexp_replace("price", '[^0-9.]', '', 'g'), '')::numeric;
  ALTER TABLE "_services_v" ALTER COLUMN "version_price" SET DATA TYPE numeric USING NULLIF(regexp_replace("version_price", '[^0-9.]', '', 'g'), '')::numeric;
  ALTER TABLE "services" ADD COLUMN "price_suffix" varchar;
  ALTER TABLE "_services_v" ADD COLUMN "version_price_suffix" varchar;
  ALTER TABLE "home_page" ADD COLUMN "about_badge_suffix" varchar DEFAULT '+';
  ALTER TABLE "home_page" ADD COLUMN "process_previous_label" varchar;
  ALTER TABLE "home_page" ADD COLUMN "process_next_label" varchar;
  ALTER TABLE "home_page" ADD COLUMN "testimonials_limit" numeric DEFAULT 9;
  ALTER TABLE "home_page" ADD COLUMN "testimonials_previous_label" varchar;
  ALTER TABLE "home_page" ADD COLUMN "testimonials_next_label" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_about_badge_suffix" varchar DEFAULT '+';
  ALTER TABLE "_home_page_v" ADD COLUMN "version_process_previous_label" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_process_next_label" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_testimonials_limit" numeric DEFAULT 9;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_testimonials_previous_label" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_testimonials_next_label" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "error_page_title" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "error_page_message" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "error_page_retry_label" varchar;
  ALTER TABLE "_site_settings_v" ADD COLUMN "version_error_page_title" varchar;
  ALTER TABLE "_site_settings_v" ADD COLUMN "version_error_page_message" varchar;
  ALTER TABLE "_site_settings_v" ADD COLUMN "version_error_page_retry_label" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "services" ALTER COLUMN "price" SET DATA TYPE varchar;
  ALTER TABLE "_services_v" ALTER COLUMN "version_price" SET DATA TYPE varchar;
  ALTER TABLE "services" DROP COLUMN "price_suffix";
  ALTER TABLE "_services_v" DROP COLUMN "version_price_suffix";
  ALTER TABLE "home_page" DROP COLUMN "about_badge_suffix";
  ALTER TABLE "home_page" DROP COLUMN "process_previous_label";
  ALTER TABLE "home_page" DROP COLUMN "process_next_label";
  ALTER TABLE "home_page" DROP COLUMN "testimonials_limit";
  ALTER TABLE "home_page" DROP COLUMN "testimonials_previous_label";
  ALTER TABLE "home_page" DROP COLUMN "testimonials_next_label";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_about_badge_suffix";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_process_previous_label";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_process_next_label";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_testimonials_limit";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_testimonials_previous_label";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_testimonials_next_label";
  ALTER TABLE "site_settings" DROP COLUMN "error_page_title";
  ALTER TABLE "site_settings" DROP COLUMN "error_page_message";
  ALTER TABLE "site_settings" DROP COLUMN "error_page_retry_label";
  ALTER TABLE "_site_settings_v" DROP COLUMN "version_error_page_title";
  ALTER TABLE "_site_settings_v" DROP COLUMN "version_error_page_message";
  ALTER TABLE "_site_settings_v" DROP COLUMN "version_error_page_retry_label";`)
}
