import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor', 'user');
  CREATE TYPE "public"."enum_landing_page_services_bar_icon" AS ENUM('SprayCan', 'Car', 'Sparkles', 'Wind', 'ShieldCheck', 'Palette');
  CREATE TYPE "public"."enum_landing_page_about_section_stats_icon" AS ENUM('Users', 'Car', 'Award', 'Settings2', 'Trophy', 'Clock');
  CREATE TYPE "public"."enum_landing_page_cta_banner_cta_items_icon_name" AS ENUM('Wrench', 'CalendarDays', 'Car', 'Sparkles', 'SprayCan');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" "enum_users_role" DEFAULT 'user',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"title" varchar,
  	"review" varchar,
  	"avatar_id" integer,
  	"rating" numeric DEFAULT 5,
  	"featured" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "brands" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"logo_id" integer,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"testimonials_id" integer,
  	"brands_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings_contact_info_additional_phones" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "site_settings_navigation" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"link" varchar,
  	"order" numeric DEFAULT 0
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"company_name" varchar DEFAULT 'RPM Detailing',
  	"phone" varchar DEFAULT '(425) 345-3564',
  	"email" varchar DEFAULT 'support@rpm-detailing.com',
  	"address" varchar DEFAULT 'Boise, ID, USA',
  	"years_of_experience" numeric DEFAULT 20,
  	"hours_weekdays" varchar DEFAULT 'Mon - Fri: 8.00 am - 6.00 pm',
  	"hours_saturday" varchar DEFAULT 'Saturday: 9.00 am - 4.00 pm',
  	"hours_sunday" varchar DEFAULT 'Sunday: Closed',
  	"logo_id" integer,
  	"dark_logo_id" integer,
  	"description" varchar DEFAULT 'Your trusted partner for premium car detailing services. We restore and protect your vehicle''s beauty with meticulous care.',
  	"copyright" varchar DEFAULT '© {year} RPM Detailing. All Rights Reserved.',
  	"footer_c_t_a_heading" varchar DEFAULT 'Need Help?',
  	"footer_c_t_a_text" varchar DEFAULT 'Ready for a showroom shine? Book your car detailing appointment today!',
  	"footer_c_t_a_button_text" varchar DEFAULT 'Book Now',
  	"footer_c_t_a_button_link" varchar DEFAULT '/booking',
  	"header_c_t_a_show" boolean DEFAULT true,
  	"header_c_t_a_text" varchar DEFAULT 'Book Now',
  	"header_c_t_a_link" varchar DEFAULT '/booking',
  	"calcom_enabled" boolean DEFAULT true,
  	"calcom_link" varchar,
  	"calcom_event_slug" varchar,
  	"calcom_fallback_title" varchar DEFAULT 'Book Your Detailing Service',
  	"calcom_fallback_message" varchar DEFAULT 'Online booking is currently unavailable. Please contact us directly to schedule your appointment.',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "landing_page_services_bar" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"order" numeric,
  	"icon" "enum_landing_page_services_bar_icon",
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "landing_page_about_section_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar
  );
  
  CREATE TABLE "landing_page_about_section_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"icon" "enum_landing_page_about_section_stats_icon"
  );
  
  CREATE TABLE "landing_page_detailed_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"order" numeric,
  	"package_id" varchar,
  	"title" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"price" varchar,
  	"duration" varchar
  );
  
  CREATE TABLE "landing_page_cta_banner_cta_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon_name" "enum_landing_page_cta_banner_cta_items_icon_name"
  );
  
  CREATE TABLE "landing_page_process_section_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"order" numeric,
  	"title" varchar,
  	"active" boolean DEFAULT false,
  	"description" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "landing_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title" varchar,
  	"hero_subtitle" varchar,
  	"hero_background_image_id" integer,
  	"hero_cta_text" varchar DEFAULT 'Book Now',
  	"hero_cta_link" varchar DEFAULT '/booking',
  	"hero_show_phone_numbers" boolean DEFAULT true,
  	"hero_show_address" boolean DEFAULT true,
  	"about_section_title" varchar,
  	"about_section_subtitle" varchar,
  	"about_section_content" jsonb,
  	"about_section_image_id" integer,
  	"cta_banner_heading" varchar,
  	"cta_banner_description" varchar,
  	"cta_banner_button_text" varchar DEFAULT 'Book Now',
  	"cta_banner_button_link" varchar DEFAULT '/booking',
  	"cta_banner_background_image_id" integer,
  	"cta_banner_pre_heading" varchar DEFAULT 'Get Your Car Professionally Detailed',
  	"process_section_pre_heading" varchar DEFAULT '// OUR DETAILING METHOD',
  	"process_section_title" varchar DEFAULT 'Our Working Process',
  	"process_section_subtitle" varchar DEFAULT 'How we deliver exceptional results',
  	"testimonials_section_title" varchar DEFAULT 'What Our Customers Say',
  	"testimonials_section_subtitle" varchar DEFAULT 'Real reviews from satisfied customers',
  	"brands_section_title" varchar DEFAULT 'Trusted by Leading Brands',
  	"brands_section_subtitle" varchar DEFAULT 'We work with all major car manufacturers',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "services_page_services_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar
  );
  
  CREATE TABLE "services_page_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" jsonb,
  	"image_id" integer,
  	"price" varchar,
  	"duration" varchar
  );
  
  CREATE TABLE "services_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title" varchar DEFAULT 'Our Premium Detailing Services',
  	"hero_subtitle" varchar DEFAULT 'Professional auto detailing services tailored to your needs',
  	"hero_image_id" integer,
  	"cta_title" varchar DEFAULT 'Ready to Transform Your Vehicle?',
  	"cta_text" varchar DEFAULT 'Schedule your detailing service today and experience the RPM difference.',
  	"cta_button_text" varchar DEFAULT 'Book Now',
  	"cta_button_link" varchar DEFAULT '/booking',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "about_page_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon" varchar
  );
  
  CREATE TABLE "about_page_team_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"position" varchar,
  	"bio" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "about_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title" varchar DEFAULT 'About RPM Detailing',
  	"hero_subtitle" varchar DEFAULT 'Your trusted partner in premium auto detailing',
  	"hero_image_id" integer,
  	"story_title" varchar DEFAULT 'Our Story',
  	"story_content" jsonb,
  	"story_image_id" integer,
  	"team_title" varchar DEFAULT 'Meet Our Team',
  	"team_subtitle" varchar DEFAULT 'Dedicated professionals passionate about auto detailing',
  	"cta_title" varchar DEFAULT 'Let''s Work Together',
  	"cta_button_text" varchar DEFAULT 'Get in Touch',
  	"cta_button_link" varchar DEFAULT '/booking',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "brands" ADD CONSTRAINT "brands_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_brands_fk" FOREIGN KEY ("brands_id") REFERENCES "public"."brands"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_contact_info_additional_phones" ADD CONSTRAINT "site_settings_contact_info_additional_phones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_navigation" ADD CONSTRAINT "site_settings_navigation_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_dark_logo_id_media_id_fk" FOREIGN KEY ("dark_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "landing_page_services_bar" ADD CONSTRAINT "landing_page_services_bar_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_page_about_section_features" ADD CONSTRAINT "landing_page_about_section_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_page_about_section_stats" ADD CONSTRAINT "landing_page_about_section_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_page_detailed_services" ADD CONSTRAINT "landing_page_detailed_services_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "landing_page_detailed_services" ADD CONSTRAINT "landing_page_detailed_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_page_cta_banner_cta_items" ADD CONSTRAINT "landing_page_cta_banner_cta_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_page_process_section_steps" ADD CONSTRAINT "landing_page_process_section_steps_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "landing_page_process_section_steps" ADD CONSTRAINT "landing_page_process_section_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_page" ADD CONSTRAINT "landing_page_hero_background_image_id_media_id_fk" FOREIGN KEY ("hero_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "landing_page" ADD CONSTRAINT "landing_page_about_section_image_id_media_id_fk" FOREIGN KEY ("about_section_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "landing_page" ADD CONSTRAINT "landing_page_cta_banner_background_image_id_media_id_fk" FOREIGN KEY ("cta_banner_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_page_services_features" ADD CONSTRAINT "services_page_services_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_page_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_page_services" ADD CONSTRAINT "services_page_services_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_page_services" ADD CONSTRAINT "services_page_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_page" ADD CONSTRAINT "services_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page_values" ADD CONSTRAINT "about_page_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_team_members" ADD CONSTRAINT "about_page_team_members_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page_team_members" ADD CONSTRAINT "about_page_team_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_story_image_id_media_id_fk" FOREIGN KEY ("story_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "testimonials_avatar_idx" ON "testimonials" USING btree ("avatar_id");
  CREATE INDEX "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
  CREATE INDEX "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
  CREATE INDEX "brands_logo_idx" ON "brands" USING btree ("logo_id");
  CREATE INDEX "brands_updated_at_idx" ON "brands" USING btree ("updated_at");
  CREATE INDEX "brands_created_at_idx" ON "brands" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");
  CREATE INDEX "payload_locked_documents_rels_brands_id_idx" ON "payload_locked_documents_rels" USING btree ("brands_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_settings_contact_info_additional_phones_order_idx" ON "site_settings_contact_info_additional_phones" USING btree ("_order");
  CREATE INDEX "site_settings_contact_info_additional_phones_parent_id_idx" ON "site_settings_contact_info_additional_phones" USING btree ("_parent_id");
  CREATE INDEX "site_settings_navigation_order_idx" ON "site_settings_navigation" USING btree ("_order");
  CREATE INDEX "site_settings_navigation_parent_id_idx" ON "site_settings_navigation" USING btree ("_parent_id");
  CREATE INDEX "site_settings_logo_idx" ON "site_settings" USING btree ("logo_id");
  CREATE INDEX "site_settings_dark_logo_idx" ON "site_settings" USING btree ("dark_logo_id");
  CREATE INDEX "landing_page_services_bar_order_idx" ON "landing_page_services_bar" USING btree ("_order");
  CREATE INDEX "landing_page_services_bar_parent_id_idx" ON "landing_page_services_bar" USING btree ("_parent_id");
  CREATE INDEX "landing_page_about_section_features_order_idx" ON "landing_page_about_section_features" USING btree ("_order");
  CREATE INDEX "landing_page_about_section_features_parent_id_idx" ON "landing_page_about_section_features" USING btree ("_parent_id");
  CREATE INDEX "landing_page_about_section_stats_order_idx" ON "landing_page_about_section_stats" USING btree ("_order");
  CREATE INDEX "landing_page_about_section_stats_parent_id_idx" ON "landing_page_about_section_stats" USING btree ("_parent_id");
  CREATE INDEX "landing_page_detailed_services_order_idx" ON "landing_page_detailed_services" USING btree ("_order");
  CREATE INDEX "landing_page_detailed_services_parent_id_idx" ON "landing_page_detailed_services" USING btree ("_parent_id");
  CREATE INDEX "landing_page_detailed_services_image_idx" ON "landing_page_detailed_services" USING btree ("image_id");
  CREATE INDEX "landing_page_cta_banner_cta_items_order_idx" ON "landing_page_cta_banner_cta_items" USING btree ("_order");
  CREATE INDEX "landing_page_cta_banner_cta_items_parent_id_idx" ON "landing_page_cta_banner_cta_items" USING btree ("_parent_id");
  CREATE INDEX "landing_page_process_section_steps_order_idx" ON "landing_page_process_section_steps" USING btree ("_order");
  CREATE INDEX "landing_page_process_section_steps_parent_id_idx" ON "landing_page_process_section_steps" USING btree ("_parent_id");
  CREATE INDEX "landing_page_process_section_steps_image_idx" ON "landing_page_process_section_steps" USING btree ("image_id");
  CREATE INDEX "landing_page_hero_hero_background_image_idx" ON "landing_page" USING btree ("hero_background_image_id");
  CREATE INDEX "landing_page_about_section_about_section_image_idx" ON "landing_page" USING btree ("about_section_image_id");
  CREATE INDEX "landing_page_cta_banner_cta_banner_background_image_idx" ON "landing_page" USING btree ("cta_banner_background_image_id");
  CREATE INDEX "services_page_services_features_order_idx" ON "services_page_services_features" USING btree ("_order");
  CREATE INDEX "services_page_services_features_parent_id_idx" ON "services_page_services_features" USING btree ("_parent_id");
  CREATE INDEX "services_page_services_order_idx" ON "services_page_services" USING btree ("_order");
  CREATE INDEX "services_page_services_parent_id_idx" ON "services_page_services" USING btree ("_parent_id");
  CREATE INDEX "services_page_services_image_idx" ON "services_page_services" USING btree ("image_id");
  CREATE INDEX "services_page_hero_image_idx" ON "services_page" USING btree ("hero_image_id");
  CREATE INDEX "about_page_values_order_idx" ON "about_page_values" USING btree ("_order");
  CREATE INDEX "about_page_values_parent_id_idx" ON "about_page_values" USING btree ("_parent_id");
  CREATE INDEX "about_page_team_members_order_idx" ON "about_page_team_members" USING btree ("_order");
  CREATE INDEX "about_page_team_members_parent_id_idx" ON "about_page_team_members" USING btree ("_parent_id");
  CREATE INDEX "about_page_team_members_image_idx" ON "about_page_team_members" USING btree ("image_id");
  CREATE INDEX "about_page_hero_image_idx" ON "about_page" USING btree ("hero_image_id");
  CREATE INDEX "about_page_story_image_idx" ON "about_page" USING btree ("story_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "testimonials" CASCADE;
  DROP TABLE "brands" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings_contact_info_additional_phones" CASCADE;
  DROP TABLE "site_settings_navigation" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "landing_page_services_bar" CASCADE;
  DROP TABLE "landing_page_about_section_features" CASCADE;
  DROP TABLE "landing_page_about_section_stats" CASCADE;
  DROP TABLE "landing_page_detailed_services" CASCADE;
  DROP TABLE "landing_page_cta_banner_cta_items" CASCADE;
  DROP TABLE "landing_page_process_section_steps" CASCADE;
  DROP TABLE "landing_page" CASCADE;
  DROP TABLE "services_page_services_features" CASCADE;
  DROP TABLE "services_page_services" CASCADE;
  DROP TABLE "services_page" CASCADE;
  DROP TABLE "about_page_values" CASCADE;
  DROP TABLE "about_page_team_members" CASCADE;
  DROP TABLE "about_page" CASCADE;
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_landing_page_services_bar_icon";
  DROP TYPE "public"."enum_landing_page_about_section_stats_icon";
  DROP TYPE "public"."enum_landing_page_cta_banner_cta_items_icon_name";`)
}
