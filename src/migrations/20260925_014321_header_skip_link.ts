import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "header" ADD COLUMN "skip_link_label" varchar DEFAULT 'Skip to content';
  ALTER TABLE "_header_v" ADD COLUMN "version_skip_link_label" varchar DEFAULT 'Skip to content';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "header" DROP COLUMN "skip_link_label";
  ALTER TABLE "_header_v" DROP COLUMN "version_skip_link_label";`)
}
