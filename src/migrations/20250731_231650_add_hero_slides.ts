import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "landing_page_hero_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar
  );
  
  ALTER TABLE "landing_page_hero_slides" ADD CONSTRAINT "landing_page_hero_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "landing_page_hero_slides_order_idx" ON "landing_page_hero_slides" USING btree ("_order");
  CREATE INDEX "landing_page_hero_slides_parent_id_idx" ON "landing_page_hero_slides" USING btree ("_parent_id");
  ALTER TABLE "landing_page" DROP COLUMN "hero_title";
  ALTER TABLE "landing_page" DROP COLUMN "hero_subtitle";`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "landing_page_hero_slides" CASCADE;
  ALTER TABLE "landing_page" ADD COLUMN "hero_title" varchar;
  ALTER TABLE "landing_page" ADD COLUMN "hero_subtitle" varchar;`)
}
