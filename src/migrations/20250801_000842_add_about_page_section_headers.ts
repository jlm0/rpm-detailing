import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "about_page" ADD COLUMN "values_section_title" varchar DEFAULT 'Our Core Values';
  ALTER TABLE "about_page" ADD COLUMN "values_section_subtitle" varchar DEFAULT 'These principles guide everything we do and define who we are as a company';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "about_page" DROP COLUMN "values_section_title";
  ALTER TABLE "about_page" DROP COLUMN "values_section_subtitle";`)
}
