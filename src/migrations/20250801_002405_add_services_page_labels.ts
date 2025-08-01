import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "services_page" ADD COLUMN "hero_image_alt" varchar DEFAULT 'Services hero background';
  ALTER TABLE "services_page" ADD COLUMN "service_includes_label" varchar DEFAULT 'Service Includes:';
  ALTER TABLE "services_page" ADD COLUMN "starting_at_label" varchar DEFAULT 'Starting at';
  ALTER TABLE "services_page" ADD COLUMN "book_service_button_text" varchar DEFAULT 'Book This Service';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "services_page" DROP COLUMN "hero_image_alt";
  ALTER TABLE "services_page" DROP COLUMN "service_includes_label";
  ALTER TABLE "services_page" DROP COLUMN "starting_at_label";
  ALTER TABLE "services_page" DROP COLUMN "book_service_button_text";`)
}
