import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_services_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__services_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_testimonials_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__testimonials_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_brands_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__brands_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_home_page_services_bar_items_icon" AS ENUM('Award', 'CalendarDays', 'Car', 'Clock', 'Heart', 'Palette', 'Settings2', 'Shield', 'ShieldCheck', 'Sparkles', 'SprayCan', 'Star', 'Trophy', 'Users', 'Wind', 'Wrench');
  CREATE TYPE "public"."enum_home_page_cta_banner_steps_icon" AS ENUM('Award', 'CalendarDays', 'Car', 'Clock', 'Heart', 'Palette', 'Settings2', 'Shield', 'ShieldCheck', 'Sparkles', 'SprayCan', 'Star', 'Trophy', 'Users', 'Wind', 'Wrench');
  CREATE TYPE "public"."enum_home_page_process_stats_icon" AS ENUM('Award', 'CalendarDays', 'Car', 'Clock', 'Heart', 'Palette', 'Settings2', 'Shield', 'ShieldCheck', 'Sparkles', 'SprayCan', 'Star', 'Trophy', 'Users', 'Wind', 'Wrench');
  CREATE TYPE "public"."enum_home_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__home_page_v_version_services_bar_items_icon" AS ENUM('Award', 'CalendarDays', 'Car', 'Clock', 'Heart', 'Palette', 'Settings2', 'Shield', 'ShieldCheck', 'Sparkles', 'SprayCan', 'Star', 'Trophy', 'Users', 'Wind', 'Wrench');
  CREATE TYPE "public"."enum__home_page_v_version_cta_banner_steps_icon" AS ENUM('Award', 'CalendarDays', 'Car', 'Clock', 'Heart', 'Palette', 'Settings2', 'Shield', 'ShieldCheck', 'Sparkles', 'SprayCan', 'Star', 'Trophy', 'Users', 'Wind', 'Wrench');
  CREATE TYPE "public"."enum__home_page_v_version_process_stats_icon" AS ENUM('Award', 'CalendarDays', 'Car', 'Clock', 'Heart', 'Palette', 'Settings2', 'Shield', 'ShieldCheck', 'Sparkles', 'SprayCan', 'Star', 'Trophy', 'Users', 'Wind', 'Wrench');
  CREATE TYPE "public"."enum__home_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_services_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__services_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_about_page_values_items_icon" AS ENUM('Award', 'CalendarDays', 'Car', 'Clock', 'Heart', 'Palette', 'Settings2', 'Shield', 'ShieldCheck', 'Sparkles', 'SprayCan', 'Star', 'Trophy', 'Users', 'Wind', 'Wrench');
  CREATE TYPE "public"."enum_about_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__about_page_v_version_values_items_icon" AS ENUM('Award', 'CalendarDays', 'Car', 'Clock', 'Heart', 'Palette', 'Settings2', 'Shield', 'ShieldCheck', 'Sparkles', 'SprayCan', 'Star', 'Trophy', 'Users', 'Wind', 'Wrench');
  CREATE TYPE "public"."enum__about_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_booking_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__booking_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_site_settings_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__site_settings_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_header_nav_items_type" AS ENUM('link', 'contact');
  CREATE TYPE "public"."enum_header_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__header_v_version_nav_items_type" AS ENUM('link', 'contact');
  CREATE TYPE "public"."enum__header_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_footer_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__footer_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "services_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar
  );
  
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"title" varchar,
  	"price" varchar,
  	"duration" varchar,
  	"summary" varchar,
  	"description" jsonb,
  	"image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"deleted_at" timestamp(3) with time zone,
  	"_status" "enum_services_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_services_v_version_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"feature" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version__order" varchar,
  	"version_title" varchar,
  	"version_price" varchar,
  	"version_duration" varchar,
  	"version_summary" varchar,
  	"version_description" jsonb,
  	"version_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version_deleted_at" timestamp(3) with time zone,
  	"version__status" "enum__services_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_testimonials_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version__order" varchar,
  	"version_name" varchar,
  	"version_title" varchar,
  	"version_review" varchar,
  	"version_avatar_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version_deleted_at" timestamp(3) with time zone,
  	"version__status" "enum__testimonials_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_brands_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version__order" varchar,
  	"version_name" varchar,
  	"version_logo_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version_deleted_at" timestamp(3) with time zone,
  	"version__status" "enum__brands_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "home_page_hero_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar
  );
  
  CREATE TABLE "home_page_services_bar_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"icon" "enum_home_page_services_bar_items_icon"
  );
  
  CREATE TABLE "home_page_transformation_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar
  );
  
  CREATE TABLE "home_page_cta_banner_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon" "enum_home_page_cta_banner_steps_icon"
  );
  
  CREATE TABLE "home_page_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "home_page_process_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"icon" "enum_home_page_process_stats_icon"
  );
  
  CREATE TABLE "home_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_background_image_id" integer,
  	"hero_cta_label" varchar,
  	"hero_cta_url" varchar,
  	"hero_show_phone" boolean DEFAULT true,
  	"hero_phone_label" varchar,
  	"hero_show_address" boolean DEFAULT true,
  	"about_eyebrow" varchar,
  	"about_title" varchar,
  	"about_body" varchar,
  	"about_image_id" integer,
  	"about_badge_label" varchar,
  	"about_cta_label" varchar,
  	"about_cta_url" varchar,
  	"transformation_eyebrow" varchar,
  	"transformation_title" varchar,
  	"transformation_body" varchar,
  	"packages_eyebrow" varchar,
  	"packages_title" varchar,
  	"packages_card_button_label" varchar,
  	"packages_card_button_url" varchar,
  	"packages_view_all_label" varchar,
  	"packages_view_all_url" varchar,
  	"cta_banner_eyebrow" varchar,
  	"cta_banner_heading" varchar,
  	"cta_banner_button_label" varchar,
  	"cta_banner_button_url" varchar,
  	"process_eyebrow" varchar,
  	"process_title" varchar,
  	"testimonials_eyebrow" varchar,
  	"testimonials_title" varchar,
  	"brands_title" varchar,
  	"brands_button_label" varchar,
  	"brands_button_url" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"_status" "enum_home_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_page_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer,
  	"services_id" integer
  );
  
  CREATE TABLE "_home_page_v_version_hero_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_page_v_version_services_bar_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"icon" "enum__home_page_v_version_services_bar_items_icon",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_page_v_version_transformation_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"feature" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_page_v_version_cta_banner_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon" "enum__home_page_v_version_cta_banner_steps_icon",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_page_v_version_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_page_v_version_process_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"icon" "enum__home_page_v_version_process_stats_icon",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_background_image_id" integer,
  	"version_hero_cta_label" varchar,
  	"version_hero_cta_url" varchar,
  	"version_hero_show_phone" boolean DEFAULT true,
  	"version_hero_phone_label" varchar,
  	"version_hero_show_address" boolean DEFAULT true,
  	"version_about_eyebrow" varchar,
  	"version_about_title" varchar,
  	"version_about_body" varchar,
  	"version_about_image_id" integer,
  	"version_about_badge_label" varchar,
  	"version_about_cta_label" varchar,
  	"version_about_cta_url" varchar,
  	"version_transformation_eyebrow" varchar,
  	"version_transformation_title" varchar,
  	"version_transformation_body" varchar,
  	"version_packages_eyebrow" varchar,
  	"version_packages_title" varchar,
  	"version_packages_card_button_label" varchar,
  	"version_packages_card_button_url" varchar,
  	"version_packages_view_all_label" varchar,
  	"version_packages_view_all_url" varchar,
  	"version_cta_banner_eyebrow" varchar,
  	"version_cta_banner_heading" varchar,
  	"version_cta_banner_button_label" varchar,
  	"version_cta_banner_button_url" varchar,
  	"version_process_eyebrow" varchar,
  	"version_process_title" varchar,
  	"version_testimonials_eyebrow" varchar,
  	"version_testimonials_title" varchar,
  	"version_brands_title" varchar,
  	"version_brands_button_label" varchar,
  	"version_brands_button_url" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version__status" "enum__home_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_home_page_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer,
  	"services_id" integer
  );
  
  CREATE TABLE "_services_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_title" varchar,
  	"version_hero_subtitle" varchar,
  	"version_hero_image_id" integer,
  	"version_labels_includes" varchar,
  	"version_labels_price" varchar,
  	"version_labels_book_button_label" varchar,
  	"version_labels_book_button_url" varchar,
  	"version_cta_title" varchar,
  	"version_cta_text" varchar,
  	"version_cta_button_label" varchar,
  	"version_cta_button_url" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version__status" "enum__services_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "about_page_values_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon" "enum_about_page_values_items_icon"
  );
  
  CREATE TABLE "_about_page_v_version_values_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon" "enum__about_page_v_version_values_items_icon",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_about_page_v_version_team_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"position" varchar,
  	"bio" varchar,
  	"photo_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_about_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_title" varchar,
  	"version_hero_subtitle" varchar,
  	"version_hero_image_id" integer,
  	"version_story_title" varchar,
  	"version_story_content" jsonb,
  	"version_story_image_id" integer,
  	"version_values_title" varchar,
  	"version_values_subtitle" varchar,
  	"version_team_title" varchar,
  	"version_team_subtitle" varchar,
  	"version_cta_title" varchar,
  	"version_cta_button_label" varchar,
  	"version_cta_button_url" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version__status" "enum__about_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "booking_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"calendar_enabled" boolean DEFAULT true,
  	"calendar_cal_link" varchar,
  	"calendar_event_slug" varchar,
  	"content_back_label" varchar,
  	"content_title" varchar,
  	"content_intro" varchar,
  	"content_loading_text" varchar,
  	"content_help_text" varchar,
  	"content_phone_label" varchar,
  	"content_email_label" varchar,
  	"calendar_error_title" varchar,
  	"calendar_error_message" varchar,
  	"calendar_error_retry_label" varchar,
  	"calendar_error_call_label" varchar,
  	"unavailable_title" varchar,
  	"unavailable_message" varchar,
  	"unavailable_button_label" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"_status" "enum_booking_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_booking_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_calendar_enabled" boolean DEFAULT true,
  	"version_calendar_cal_link" varchar,
  	"version_calendar_event_slug" varchar,
  	"version_content_back_label" varchar,
  	"version_content_title" varchar,
  	"version_content_intro" varchar,
  	"version_content_loading_text" varchar,
  	"version_content_help_text" varchar,
  	"version_content_phone_label" varchar,
  	"version_content_email_label" varchar,
  	"version_calendar_error_title" varchar,
  	"version_calendar_error_message" varchar,
  	"version_calendar_error_retry_label" varchar,
  	"version_calendar_error_call_label" varchar,
  	"version_unavailable_title" varchar,
  	"version_unavailable_message" varchar,
  	"version_unavailable_button_label" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version__status" "enum__booking_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "site_settings_business_hours" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"days" varchar,
  	"time" varchar
  );
  
  CREATE TABLE "_site_settings_v_version_business_hours" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"days" varchar,
  	"time" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_site_settings_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_business_name" varchar,
  	"version_business_phone" varchar,
  	"version_business_email" varchar,
  	"version_business_address" varchar,
  	"version_business_years_of_experience" numeric,
  	"version_branding_logo_id" integer,
  	"version_branding_brand_color" varchar DEFAULT '#D9232D',
  	"version_seo_site_url" varchar,
  	"version_seo_title_suffix" varchar,
  	"version_seo_description" varchar,
  	"version_seo_keywords" varchar,
  	"version_seo_image_id" integer,
  	"version_seo_twitter_handle" varchar,
  	"version_not_found_title" varchar,
  	"version_not_found_message" varchar,
  	"version_not_found_button_label" varchar,
  	"version__status" "enum__site_settings_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "header_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"type" "enum_header_nav_items_type" DEFAULT 'link',
  	"url" varchar
  );
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"show_cta" boolean DEFAULT true,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"mobile_menu_title" varchar,
  	"mobile_menu_open_label" varchar,
  	"mobile_menu_close_label" varchar,
  	"contact_popup_title" varchar,
  	"contact_popup_contact_heading" varchar,
  	"contact_popup_hours_heading" varchar,
  	"contact_popup_cta_heading" varchar,
  	"contact_popup_cta_text" varchar,
  	"contact_popup_cta_button_label" varchar,
  	"contact_popup_cta_button_url" varchar,
  	"contact_popup_close_label" varchar,
  	"_status" "enum_header_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_header_v_version_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"type" "enum__header_v_version_nav_items_type" DEFAULT 'link',
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_header_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_show_cta" boolean DEFAULT true,
  	"version_cta_label" varchar,
  	"version_cta_url" varchar,
  	"version_mobile_menu_title" varchar,
  	"version_mobile_menu_open_label" varchar,
  	"version_mobile_menu_close_label" varchar,
  	"version_contact_popup_title" varchar,
  	"version_contact_popup_contact_heading" varchar,
  	"version_contact_popup_hours_heading" varchar,
  	"version_contact_popup_cta_heading" varchar,
  	"version_contact_popup_cta_text" varchar,
  	"version_contact_popup_cta_button_label" varchar,
  	"version_contact_popup_cta_button_url" varchar,
  	"version_contact_popup_close_label" varchar,
  	"version__status" "enum__header_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"description" varchar,
  	"contact_heading" varchar,
  	"hours_heading" varchar,
  	"cta_heading" varchar,
  	"cta_text" varchar,
  	"cta_button_label" varchar,
  	"cta_button_url" varchar,
  	"copyright" varchar,
  	"_status" "enum_footer_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_footer_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_description" varchar,
  	"version_contact_heading" varchar,
  	"version_hours_heading" varchar,
  	"version_cta_heading" varchar,
  	"version_cta_text" varchar,
  	"version_cta_button_label" varchar,
  	"version_cta_button_url" varchar,
  	"version_copyright" varchar,
  	"version__status" "enum__footer_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  ALTER TABLE "site_settings_contact_info_additional_phones" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_navigation" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "landing_page_hero_slides" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "landing_page_services_bar" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "landing_page_about_section_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "landing_page_about_section_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "landing_page_detailed_services" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "landing_page_cta_banner_cta_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "landing_page_process_section_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "landing_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_page_services_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_page_services" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "ui_labels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "about_page_values" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "site_settings_contact_info_additional_phones" CASCADE;
  DROP TABLE "site_settings_navigation" CASCADE;
  DROP TABLE "landing_page_hero_slides" CASCADE;
  DROP TABLE "landing_page_services_bar" CASCADE;
  DROP TABLE "landing_page_about_section_features" CASCADE;
  DROP TABLE "landing_page_about_section_stats" CASCADE;
  DROP TABLE "landing_page_detailed_services" CASCADE;
  DROP TABLE "landing_page_cta_banner_cta_items" CASCADE;
  DROP TABLE "landing_page_process_section_steps" CASCADE;
  DROP TABLE "landing_page" CASCADE;
  DROP TABLE "services_page_services_features" CASCADE;
  DROP TABLE "services_page_services" CASCADE;
  DROP TABLE "ui_labels" CASCADE;
  DROP TABLE "about_page_values" CASCADE;
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_logo_id_media_id_fk";
  
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_dark_logo_id_media_id_fk";
  
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_open_graph_default_image_id_media_id_fk";
  
  ALTER TABLE "about_page_team_members" DROP CONSTRAINT "about_page_team_members_image_id_media_id_fk";
  
  ALTER TABLE "users" ALTER COLUMN "role" SET DATA TYPE text;
  ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'editor'::text;
  DROP TYPE "public"."enum_users_role";
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor');
  ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'editor'::"public"."enum_users_role";
  ALTER TABLE "users" ALTER COLUMN "role" SET DATA TYPE "public"."enum_users_role" USING "role"::"public"."enum_users_role";
  DROP INDEX "site_settings_logo_idx";
  DROP INDEX "site_settings_dark_logo_idx";
  DROP INDEX "site_settings_open_graph_open_graph_default_image_idx";
  DROP INDEX "services_page_hero_image_idx";
  DROP INDEX "about_page_team_members_image_idx";
  DROP INDEX "about_page_hero_image_idx";
  DROP INDEX "about_page_story_image_idx";
  ALTER TABLE "users" ALTER COLUMN "name" SET NOT NULL;
  ALTER TABLE "users" ALTER COLUMN "role" SET NOT NULL;
  ALTER TABLE "media" ALTER COLUMN "alt" SET NOT NULL;
  ALTER TABLE "services_page" ALTER COLUMN "hero_title" DROP DEFAULT;
  ALTER TABLE "services_page" ALTER COLUMN "hero_subtitle" DROP DEFAULT;
  ALTER TABLE "services_page" ALTER COLUMN "cta_title" DROP DEFAULT;
  ALTER TABLE "services_page" ALTER COLUMN "cta_text" DROP DEFAULT;
  ALTER TABLE "about_page" ALTER COLUMN "hero_title" DROP DEFAULT;
  ALTER TABLE "about_page" ALTER COLUMN "hero_subtitle" DROP DEFAULT;
  ALTER TABLE "about_page" ALTER COLUMN "story_title" DROP DEFAULT;
  ALTER TABLE "about_page" ALTER COLUMN "team_title" DROP DEFAULT;
  ALTER TABLE "about_page" ALTER COLUMN "team_subtitle" DROP DEFAULT;
  ALTER TABLE "about_page" ALTER COLUMN "cta_title" DROP DEFAULT;
  ALTER TABLE "media" ADD COLUMN "prefix" varchar DEFAULT '';
  ALTER TABLE "media" ADD COLUMN "_objectkey" varchar;
  ALTER TABLE "media" ADD COLUMN "deleted_at" timestamp(3) with time zone;
  ALTER TABLE "media" ADD COLUMN "sizes_thumbnail_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_thumbnail_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_thumbnail_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_thumbnail_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_thumbnail_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_thumbnail_filename" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_card_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_card_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_card_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_card_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_card_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_card_filename" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_hero_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_hero_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_hero_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_hero_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_hero_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_hero_filename" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_og_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_og_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_og_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_og_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_og_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_og_filename" varchar;
  ALTER TABLE "testimonials" ADD COLUMN "_order" varchar;
  ALTER TABLE "testimonials" ADD COLUMN "deleted_at" timestamp(3) with time zone;
  ALTER TABLE "testimonials" ADD COLUMN "_status" "enum_testimonials_status" DEFAULT 'draft';
  ALTER TABLE "brands" ADD COLUMN "_order" varchar;
  ALTER TABLE "brands" ADD COLUMN "deleted_at" timestamp(3) with time zone;
  ALTER TABLE "brands" ADD COLUMN "_status" "enum_brands_status" DEFAULT 'draft';
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "services_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "business_name" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "business_phone" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "business_email" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "business_address" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "business_years_of_experience" numeric;
  ALTER TABLE "site_settings" ADD COLUMN "branding_logo_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "branding_brand_color" varchar DEFAULT '#D9232D';
  ALTER TABLE "site_settings" ADD COLUMN "seo_site_url" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "seo_title_suffix" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "seo_keywords" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "seo_image_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "seo_twitter_handle" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "not_found_title" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "not_found_message" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "not_found_button_label" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "_status" "enum_site_settings_status" DEFAULT 'draft';
  ALTER TABLE "services_page" ADD COLUMN "labels_includes" varchar;
  ALTER TABLE "services_page" ADD COLUMN "labels_price" varchar;
  ALTER TABLE "services_page" ADD COLUMN "labels_book_button_label" varchar;
  ALTER TABLE "services_page" ADD COLUMN "labels_book_button_url" varchar;
  ALTER TABLE "services_page" ADD COLUMN "cta_button_label" varchar;
  ALTER TABLE "services_page" ADD COLUMN "cta_button_url" varchar;
  ALTER TABLE "services_page" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "services_page" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "services_page" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "services_page" ADD COLUMN "_status" "enum_services_page_status" DEFAULT 'draft';
  ALTER TABLE "about_page_team_members" ADD COLUMN "photo_id" integer;
  ALTER TABLE "about_page" ADD COLUMN "values_title" varchar;
  ALTER TABLE "about_page" ADD COLUMN "values_subtitle" varchar;
  ALTER TABLE "about_page" ADD COLUMN "cta_button_label" varchar;
  ALTER TABLE "about_page" ADD COLUMN "cta_button_url" varchar;
  ALTER TABLE "about_page" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "about_page" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "about_page" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "about_page" ADD COLUMN "_status" "enum_about_page_status" DEFAULT 'draft';
  ALTER TABLE "services_features" ADD CONSTRAINT "services_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_version_features" ADD CONSTRAINT "_services_v_version_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_parent_id_services_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_testimonials_v" ADD CONSTRAINT "_testimonials_v_parent_id_testimonials_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_testimonials_v" ADD CONSTRAINT "_testimonials_v_version_avatar_id_media_id_fk" FOREIGN KEY ("version_avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_brands_v" ADD CONSTRAINT "_brands_v_parent_id_brands_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."brands"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_brands_v" ADD CONSTRAINT "_brands_v_version_logo_id_media_id_fk" FOREIGN KEY ("version_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_hero_slides" ADD CONSTRAINT "home_page_hero_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_services_bar_items" ADD CONSTRAINT "home_page_services_bar_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_transformation_features" ADD CONSTRAINT "home_page_transformation_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_cta_banner_steps" ADD CONSTRAINT "home_page_cta_banner_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_process_steps" ADD CONSTRAINT "home_page_process_steps_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_process_steps" ADD CONSTRAINT "home_page_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_process_stats" ADD CONSTRAINT "home_page_process_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_hero_background_image_id_media_id_fk" FOREIGN KEY ("hero_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_about_image_id_media_id_fk" FOREIGN KEY ("about_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_rels" ADD CONSTRAINT "home_page_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_rels" ADD CONSTRAINT "home_page_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_rels" ADD CONSTRAINT "home_page_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_hero_slides" ADD CONSTRAINT "_home_page_v_version_hero_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_services_bar_items" ADD CONSTRAINT "_home_page_v_version_services_bar_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_transformation_features" ADD CONSTRAINT "_home_page_v_version_transformation_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_cta_banner_steps" ADD CONSTRAINT "_home_page_v_version_cta_banner_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_process_steps" ADD CONSTRAINT "_home_page_v_version_process_steps_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_process_steps" ADD CONSTRAINT "_home_page_v_version_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_process_stats" ADD CONSTRAINT "_home_page_v_version_process_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v" ADD CONSTRAINT "_home_page_v_version_hero_background_image_id_media_id_fk" FOREIGN KEY ("version_hero_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_page_v" ADD CONSTRAINT "_home_page_v_version_about_image_id_media_id_fk" FOREIGN KEY ("version_about_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_page_v" ADD CONSTRAINT "_home_page_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_page_v_rels" ADD CONSTRAINT "_home_page_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_rels" ADD CONSTRAINT "_home_page_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_rels" ADD CONSTRAINT "_home_page_v_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_page_v" ADD CONSTRAINT "_services_page_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_page_v" ADD CONSTRAINT "_services_page_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page_values_items" ADD CONSTRAINT "about_page_values_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_values_items" ADD CONSTRAINT "_about_page_v_version_values_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_team_members" ADD CONSTRAINT "_about_page_v_version_team_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_team_members" ADD CONSTRAINT "_about_page_v_version_team_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v" ADD CONSTRAINT "_about_page_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_about_page_v" ADD CONSTRAINT "_about_page_v_version_story_image_id_media_id_fk" FOREIGN KEY ("version_story_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_about_page_v" ADD CONSTRAINT "_about_page_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "booking_page" ADD CONSTRAINT "booking_page_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_booking_page_v" ADD CONSTRAINT "_booking_page_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_business_hours" ADD CONSTRAINT "site_settings_business_hours_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_settings_v_version_business_hours" ADD CONSTRAINT "_site_settings_v_version_business_hours_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_branding_logo_id_media_id_fk" FOREIGN KEY ("version_branding_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_header_v_version_nav_items" ADD CONSTRAINT "_header_v_version_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_header_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "services_features_order_idx" ON "services_features" USING btree ("_order");
  CREATE INDEX "services_features_parent_id_idx" ON "services_features" USING btree ("_parent_id");
  CREATE INDEX "services__order_idx" ON "services" USING btree ("_order");
  CREATE INDEX "services_image_idx" ON "services" USING btree ("image_id");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE INDEX "services_deleted_at_idx" ON "services" USING btree ("deleted_at");
  CREATE INDEX "services__status_idx" ON "services" USING btree ("_status");
  CREATE INDEX "_services_v_version_features_order_idx" ON "_services_v_version_features" USING btree ("_order");
  CREATE INDEX "_services_v_version_features_parent_id_idx" ON "_services_v_version_features" USING btree ("_parent_id");
  CREATE INDEX "_services_v_parent_idx" ON "_services_v" USING btree ("parent_id");
  CREATE INDEX "_services_v_version_version__order_idx" ON "_services_v" USING btree ("version__order");
  CREATE INDEX "_services_v_version_version_image_idx" ON "_services_v" USING btree ("version_image_id");
  CREATE INDEX "_services_v_version_version_updated_at_idx" ON "_services_v" USING btree ("version_updated_at");
  CREATE INDEX "_services_v_version_version_created_at_idx" ON "_services_v" USING btree ("version_created_at");
  CREATE INDEX "_services_v_version_version_deleted_at_idx" ON "_services_v" USING btree ("version_deleted_at");
  CREATE INDEX "_services_v_version_version__status_idx" ON "_services_v" USING btree ("version__status");
  CREATE INDEX "_services_v_created_at_idx" ON "_services_v" USING btree ("created_at");
  CREATE INDEX "_services_v_updated_at_idx" ON "_services_v" USING btree ("updated_at");
  CREATE INDEX "_services_v_latest_idx" ON "_services_v" USING btree ("latest");
  CREATE INDEX "_services_v_autosave_idx" ON "_services_v" USING btree ("autosave");
  CREATE INDEX "_testimonials_v_parent_idx" ON "_testimonials_v" USING btree ("parent_id");
  CREATE INDEX "_testimonials_v_version_version__order_idx" ON "_testimonials_v" USING btree ("version__order");
  CREATE INDEX "_testimonials_v_version_version_avatar_idx" ON "_testimonials_v" USING btree ("version_avatar_id");
  CREATE INDEX "_testimonials_v_version_version_updated_at_idx" ON "_testimonials_v" USING btree ("version_updated_at");
  CREATE INDEX "_testimonials_v_version_version_created_at_idx" ON "_testimonials_v" USING btree ("version_created_at");
  CREATE INDEX "_testimonials_v_version_version_deleted_at_idx" ON "_testimonials_v" USING btree ("version_deleted_at");
  CREATE INDEX "_testimonials_v_version_version__status_idx" ON "_testimonials_v" USING btree ("version__status");
  CREATE INDEX "_testimonials_v_created_at_idx" ON "_testimonials_v" USING btree ("created_at");
  CREATE INDEX "_testimonials_v_updated_at_idx" ON "_testimonials_v" USING btree ("updated_at");
  CREATE INDEX "_testimonials_v_latest_idx" ON "_testimonials_v" USING btree ("latest");
  CREATE INDEX "_testimonials_v_autosave_idx" ON "_testimonials_v" USING btree ("autosave");
  CREATE INDEX "_brands_v_parent_idx" ON "_brands_v" USING btree ("parent_id");
  CREATE INDEX "_brands_v_version_version__order_idx" ON "_brands_v" USING btree ("version__order");
  CREATE INDEX "_brands_v_version_version_logo_idx" ON "_brands_v" USING btree ("version_logo_id");
  CREATE INDEX "_brands_v_version_version_updated_at_idx" ON "_brands_v" USING btree ("version_updated_at");
  CREATE INDEX "_brands_v_version_version_created_at_idx" ON "_brands_v" USING btree ("version_created_at");
  CREATE INDEX "_brands_v_version_version_deleted_at_idx" ON "_brands_v" USING btree ("version_deleted_at");
  CREATE INDEX "_brands_v_version_version__status_idx" ON "_brands_v" USING btree ("version__status");
  CREATE INDEX "_brands_v_created_at_idx" ON "_brands_v" USING btree ("created_at");
  CREATE INDEX "_brands_v_updated_at_idx" ON "_brands_v" USING btree ("updated_at");
  CREATE INDEX "_brands_v_latest_idx" ON "_brands_v" USING btree ("latest");
  CREATE INDEX "_brands_v_autosave_idx" ON "_brands_v" USING btree ("autosave");
  CREATE INDEX "home_page_hero_slides_order_idx" ON "home_page_hero_slides" USING btree ("_order");
  CREATE INDEX "home_page_hero_slides_parent_id_idx" ON "home_page_hero_slides" USING btree ("_parent_id");
  CREATE INDEX "home_page_services_bar_items_order_idx" ON "home_page_services_bar_items" USING btree ("_order");
  CREATE INDEX "home_page_services_bar_items_parent_id_idx" ON "home_page_services_bar_items" USING btree ("_parent_id");
  CREATE INDEX "home_page_transformation_features_order_idx" ON "home_page_transformation_features" USING btree ("_order");
  CREATE INDEX "home_page_transformation_features_parent_id_idx" ON "home_page_transformation_features" USING btree ("_parent_id");
  CREATE INDEX "home_page_cta_banner_steps_order_idx" ON "home_page_cta_banner_steps" USING btree ("_order");
  CREATE INDEX "home_page_cta_banner_steps_parent_id_idx" ON "home_page_cta_banner_steps" USING btree ("_parent_id");
  CREATE INDEX "home_page_process_steps_order_idx" ON "home_page_process_steps" USING btree ("_order");
  CREATE INDEX "home_page_process_steps_parent_id_idx" ON "home_page_process_steps" USING btree ("_parent_id");
  CREATE INDEX "home_page_process_steps_image_idx" ON "home_page_process_steps" USING btree ("image_id");
  CREATE INDEX "home_page_process_stats_order_idx" ON "home_page_process_stats" USING btree ("_order");
  CREATE INDEX "home_page_process_stats_parent_id_idx" ON "home_page_process_stats" USING btree ("_parent_id");
  CREATE INDEX "home_page_hero_hero_background_image_idx" ON "home_page" USING btree ("hero_background_image_id");
  CREATE INDEX "home_page_about_about_image_idx" ON "home_page" USING btree ("about_image_id");
  CREATE INDEX "home_page_meta_meta_image_idx" ON "home_page" USING btree ("meta_image_id");
  CREATE INDEX "home_page__status_idx" ON "home_page" USING btree ("_status");
  CREATE INDEX "home_page_rels_order_idx" ON "home_page_rels" USING btree ("order");
  CREATE INDEX "home_page_rels_parent_idx" ON "home_page_rels" USING btree ("parent_id");
  CREATE INDEX "home_page_rels_path_idx" ON "home_page_rels" USING btree ("path");
  CREATE INDEX "home_page_rels_media_id_idx" ON "home_page_rels" USING btree ("media_id");
  CREATE INDEX "home_page_rels_services_id_idx" ON "home_page_rels" USING btree ("services_id");
  CREATE INDEX "_home_page_v_version_hero_slides_order_idx" ON "_home_page_v_version_hero_slides" USING btree ("_order");
  CREATE INDEX "_home_page_v_version_hero_slides_parent_id_idx" ON "_home_page_v_version_hero_slides" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_version_services_bar_items_order_idx" ON "_home_page_v_version_services_bar_items" USING btree ("_order");
  CREATE INDEX "_home_page_v_version_services_bar_items_parent_id_idx" ON "_home_page_v_version_services_bar_items" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_version_transformation_features_order_idx" ON "_home_page_v_version_transformation_features" USING btree ("_order");
  CREATE INDEX "_home_page_v_version_transformation_features_parent_id_idx" ON "_home_page_v_version_transformation_features" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_version_cta_banner_steps_order_idx" ON "_home_page_v_version_cta_banner_steps" USING btree ("_order");
  CREATE INDEX "_home_page_v_version_cta_banner_steps_parent_id_idx" ON "_home_page_v_version_cta_banner_steps" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_version_process_steps_order_idx" ON "_home_page_v_version_process_steps" USING btree ("_order");
  CREATE INDEX "_home_page_v_version_process_steps_parent_id_idx" ON "_home_page_v_version_process_steps" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_version_process_steps_image_idx" ON "_home_page_v_version_process_steps" USING btree ("image_id");
  CREATE INDEX "_home_page_v_version_process_stats_order_idx" ON "_home_page_v_version_process_stats" USING btree ("_order");
  CREATE INDEX "_home_page_v_version_process_stats_parent_id_idx" ON "_home_page_v_version_process_stats" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_version_hero_version_hero_background_image_idx" ON "_home_page_v" USING btree ("version_hero_background_image_id");
  CREATE INDEX "_home_page_v_version_about_version_about_image_idx" ON "_home_page_v" USING btree ("version_about_image_id");
  CREATE INDEX "_home_page_v_version_meta_version_meta_image_idx" ON "_home_page_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_home_page_v_version_version__status_idx" ON "_home_page_v" USING btree ("version__status");
  CREATE INDEX "_home_page_v_created_at_idx" ON "_home_page_v" USING btree ("created_at");
  CREATE INDEX "_home_page_v_updated_at_idx" ON "_home_page_v" USING btree ("updated_at");
  CREATE INDEX "_home_page_v_latest_idx" ON "_home_page_v" USING btree ("latest");
  CREATE INDEX "_home_page_v_autosave_idx" ON "_home_page_v" USING btree ("autosave");
  CREATE INDEX "_home_page_v_rels_order_idx" ON "_home_page_v_rels" USING btree ("order");
  CREATE INDEX "_home_page_v_rels_parent_idx" ON "_home_page_v_rels" USING btree ("parent_id");
  CREATE INDEX "_home_page_v_rels_path_idx" ON "_home_page_v_rels" USING btree ("path");
  CREATE INDEX "_home_page_v_rels_media_id_idx" ON "_home_page_v_rels" USING btree ("media_id");
  CREATE INDEX "_home_page_v_rels_services_id_idx" ON "_home_page_v_rels" USING btree ("services_id");
  CREATE INDEX "_services_page_v_version_hero_version_hero_image_idx" ON "_services_page_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_services_page_v_version_meta_version_meta_image_idx" ON "_services_page_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_services_page_v_version_version__status_idx" ON "_services_page_v" USING btree ("version__status");
  CREATE INDEX "_services_page_v_created_at_idx" ON "_services_page_v" USING btree ("created_at");
  CREATE INDEX "_services_page_v_updated_at_idx" ON "_services_page_v" USING btree ("updated_at");
  CREATE INDEX "_services_page_v_latest_idx" ON "_services_page_v" USING btree ("latest");
  CREATE INDEX "_services_page_v_autosave_idx" ON "_services_page_v" USING btree ("autosave");
  CREATE INDEX "about_page_values_items_order_idx" ON "about_page_values_items" USING btree ("_order");
  CREATE INDEX "about_page_values_items_parent_id_idx" ON "about_page_values_items" USING btree ("_parent_id");
  CREATE INDEX "_about_page_v_version_values_items_order_idx" ON "_about_page_v_version_values_items" USING btree ("_order");
  CREATE INDEX "_about_page_v_version_values_items_parent_id_idx" ON "_about_page_v_version_values_items" USING btree ("_parent_id");
  CREATE INDEX "_about_page_v_version_team_members_order_idx" ON "_about_page_v_version_team_members" USING btree ("_order");
  CREATE INDEX "_about_page_v_version_team_members_parent_id_idx" ON "_about_page_v_version_team_members" USING btree ("_parent_id");
  CREATE INDEX "_about_page_v_version_team_members_photo_idx" ON "_about_page_v_version_team_members" USING btree ("photo_id");
  CREATE INDEX "_about_page_v_version_hero_version_hero_image_idx" ON "_about_page_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_about_page_v_version_story_version_story_image_idx" ON "_about_page_v" USING btree ("version_story_image_id");
  CREATE INDEX "_about_page_v_version_meta_version_meta_image_idx" ON "_about_page_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_about_page_v_version_version__status_idx" ON "_about_page_v" USING btree ("version__status");
  CREATE INDEX "_about_page_v_created_at_idx" ON "_about_page_v" USING btree ("created_at");
  CREATE INDEX "_about_page_v_updated_at_idx" ON "_about_page_v" USING btree ("updated_at");
  CREATE INDEX "_about_page_v_latest_idx" ON "_about_page_v" USING btree ("latest");
  CREATE INDEX "_about_page_v_autosave_idx" ON "_about_page_v" USING btree ("autosave");
  CREATE INDEX "booking_page_meta_meta_image_idx" ON "booking_page" USING btree ("meta_image_id");
  CREATE INDEX "booking_page__status_idx" ON "booking_page" USING btree ("_status");
  CREATE INDEX "_booking_page_v_version_meta_version_meta_image_idx" ON "_booking_page_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_booking_page_v_version_version__status_idx" ON "_booking_page_v" USING btree ("version__status");
  CREATE INDEX "_booking_page_v_created_at_idx" ON "_booking_page_v" USING btree ("created_at");
  CREATE INDEX "_booking_page_v_updated_at_idx" ON "_booking_page_v" USING btree ("updated_at");
  CREATE INDEX "_booking_page_v_latest_idx" ON "_booking_page_v" USING btree ("latest");
  CREATE INDEX "_booking_page_v_autosave_idx" ON "_booking_page_v" USING btree ("autosave");
  CREATE INDEX "site_settings_business_hours_order_idx" ON "site_settings_business_hours" USING btree ("_order");
  CREATE INDEX "site_settings_business_hours_parent_id_idx" ON "site_settings_business_hours" USING btree ("_parent_id");
  CREATE INDEX "_site_settings_v_version_business_hours_order_idx" ON "_site_settings_v_version_business_hours" USING btree ("_order");
  CREATE INDEX "_site_settings_v_version_business_hours_parent_id_idx" ON "_site_settings_v_version_business_hours" USING btree ("_parent_id");
  CREATE INDEX "_site_settings_v_version_branding_version_branding_logo_idx" ON "_site_settings_v" USING btree ("version_branding_logo_id");
  CREATE INDEX "_site_settings_v_version_seo_version_seo_image_idx" ON "_site_settings_v" USING btree ("version_seo_image_id");
  CREATE INDEX "_site_settings_v_version_version__status_idx" ON "_site_settings_v" USING btree ("version__status");
  CREATE INDEX "_site_settings_v_created_at_idx" ON "_site_settings_v" USING btree ("created_at");
  CREATE INDEX "_site_settings_v_updated_at_idx" ON "_site_settings_v" USING btree ("updated_at");
  CREATE INDEX "_site_settings_v_latest_idx" ON "_site_settings_v" USING btree ("latest");
  CREATE INDEX "_site_settings_v_autosave_idx" ON "_site_settings_v" USING btree ("autosave");
  CREATE INDEX "header_nav_items_order_idx" ON "header_nav_items" USING btree ("_order");
  CREATE INDEX "header_nav_items_parent_id_idx" ON "header_nav_items" USING btree ("_parent_id");
  CREATE INDEX "header__status_idx" ON "header" USING btree ("_status");
  CREATE INDEX "_header_v_version_nav_items_order_idx" ON "_header_v_version_nav_items" USING btree ("_order");
  CREATE INDEX "_header_v_version_nav_items_parent_id_idx" ON "_header_v_version_nav_items" USING btree ("_parent_id");
  CREATE INDEX "_header_v_version_version__status_idx" ON "_header_v" USING btree ("version__status");
  CREATE INDEX "_header_v_created_at_idx" ON "_header_v" USING btree ("created_at");
  CREATE INDEX "_header_v_updated_at_idx" ON "_header_v" USING btree ("updated_at");
  CREATE INDEX "_header_v_latest_idx" ON "_header_v" USING btree ("latest");
  CREATE INDEX "_header_v_autosave_idx" ON "_header_v" USING btree ("autosave");
  CREATE INDEX "footer__status_idx" ON "footer" USING btree ("_status");
  CREATE INDEX "_footer_v_version_version__status_idx" ON "_footer_v" USING btree ("version__status");
  CREATE INDEX "_footer_v_created_at_idx" ON "_footer_v" USING btree ("created_at");
  CREATE INDEX "_footer_v_updated_at_idx" ON "_footer_v" USING btree ("updated_at");
  CREATE INDEX "_footer_v_latest_idx" ON "_footer_v" USING btree ("latest");
  CREATE INDEX "_footer_v_autosave_idx" ON "_footer_v" USING btree ("autosave");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_branding_logo_id_media_id_fk" FOREIGN KEY ("branding_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_page" ADD CONSTRAINT "services_page_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page_team_members" ADD CONSTRAINT "about_page_team_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "media_deleted_at_idx" ON "media" USING btree ("deleted_at");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_hero_sizes_hero_filename_idx" ON "media" USING btree ("sizes_hero_filename");
  CREATE INDEX "media_sizes_og_sizes_og_filename_idx" ON "media" USING btree ("sizes_og_filename");
  CREATE INDEX "testimonials__order_idx" ON "testimonials" USING btree ("_order");
  CREATE INDEX "testimonials_deleted_at_idx" ON "testimonials" USING btree ("deleted_at");
  CREATE INDEX "testimonials__status_idx" ON "testimonials" USING btree ("_status");
  CREATE INDEX "brands__order_idx" ON "brands" USING btree ("_order");
  CREATE INDEX "brands_deleted_at_idx" ON "brands" USING btree ("deleted_at");
  CREATE INDEX "brands__status_idx" ON "brands" USING btree ("_status");
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "site_settings_branding_branding_logo_idx" ON "site_settings" USING btree ("branding_logo_id");
  CREATE INDEX "site_settings_seo_seo_image_idx" ON "site_settings" USING btree ("seo_image_id");
  CREATE INDEX "site_settings__status_idx" ON "site_settings" USING btree ("_status");
  CREATE INDEX "services_page_hero_hero_image_idx" ON "services_page" USING btree ("hero_image_id");
  CREATE INDEX "services_page_meta_meta_image_idx" ON "services_page" USING btree ("meta_image_id");
  CREATE INDEX "services_page__status_idx" ON "services_page" USING btree ("_status");
  CREATE INDEX "about_page_team_members_photo_idx" ON "about_page_team_members" USING btree ("photo_id");
  CREATE INDEX "about_page_hero_hero_image_idx" ON "about_page" USING btree ("hero_image_id");
  CREATE INDEX "about_page_story_story_image_idx" ON "about_page" USING btree ("story_image_id");
  CREATE INDEX "about_page_meta_meta_image_idx" ON "about_page" USING btree ("meta_image_id");
  CREATE INDEX "about_page__status_idx" ON "about_page" USING btree ("_status");
  ALTER TABLE "testimonials" DROP COLUMN "rating";
  ALTER TABLE "testimonials" DROP COLUMN "featured";
  ALTER TABLE "brands" DROP COLUMN "order";
  ALTER TABLE "site_settings" DROP COLUMN "company_name";
  ALTER TABLE "site_settings" DROP COLUMN "phone";
  ALTER TABLE "site_settings" DROP COLUMN "email";
  ALTER TABLE "site_settings" DROP COLUMN "address";
  ALTER TABLE "site_settings" DROP COLUMN "years_of_experience";
  ALTER TABLE "site_settings" DROP COLUMN "hours_weekdays";
  ALTER TABLE "site_settings" DROP COLUMN "hours_saturday";
  ALTER TABLE "site_settings" DROP COLUMN "hours_sunday";
  ALTER TABLE "site_settings" DROP COLUMN "logo_id";
  ALTER TABLE "site_settings" DROP COLUMN "dark_logo_id";
  ALTER TABLE "site_settings" DROP COLUMN "description";
  ALTER TABLE "site_settings" DROP COLUMN "copyright";
  ALTER TABLE "site_settings" DROP COLUMN "footer_section_titles_contact_info_title";
  ALTER TABLE "site_settings" DROP COLUMN "footer_section_titles_opening_hours_title";
  ALTER TABLE "site_settings" DROP COLUMN "footer_c_t_a_heading";
  ALTER TABLE "site_settings" DROP COLUMN "footer_c_t_a_text";
  ALTER TABLE "site_settings" DROP COLUMN "footer_c_t_a_button_text";
  ALTER TABLE "site_settings" DROP COLUMN "footer_c_t_a_button_link";
  ALTER TABLE "site_settings" DROP COLUMN "header_c_t_a_show";
  ALTER TABLE "site_settings" DROP COLUMN "header_c_t_a_text";
  ALTER TABLE "site_settings" DROP COLUMN "header_c_t_a_link";
  ALTER TABLE "site_settings" DROP COLUMN "calcom_enabled";
  ALTER TABLE "site_settings" DROP COLUMN "calcom_link";
  ALTER TABLE "site_settings" DROP COLUMN "calcom_event_slug";
  ALTER TABLE "site_settings" DROP COLUMN "calcom_fallback_title";
  ALTER TABLE "site_settings" DROP COLUMN "calcom_fallback_message";
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
  ALTER TABLE "services_page" DROP COLUMN "hero_image_alt";
  ALTER TABLE "services_page" DROP COLUMN "service_includes_label";
  ALTER TABLE "services_page" DROP COLUMN "starting_at_label";
  ALTER TABLE "services_page" DROP COLUMN "book_service_button_text";
  ALTER TABLE "services_page" DROP COLUMN "cta_button_text";
  ALTER TABLE "services_page" DROP COLUMN "cta_button_link";
  ALTER TABLE "about_page_team_members" DROP COLUMN "image_id";
  ALTER TABLE "about_page" DROP COLUMN "values_section_title";
  ALTER TABLE "about_page" DROP COLUMN "values_section_subtitle";
  ALTER TABLE "about_page" DROP COLUMN "cta_button_text";
  ALTER TABLE "about_page" DROP COLUMN "cta_button_link";
  DROP TYPE "public"."enum_site_settings_locale";
  DROP TYPE "public"."enum_site_settings_twitter_card_type";
  DROP TYPE "public"."enum_landing_page_services_bar_icon";
  DROP TYPE "public"."enum_landing_page_about_section_stats_icon";
  DROP TYPE "public"."enum_landing_page_cta_banner_cta_items_icon_name";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_site_settings_locale" AS ENUM('en_US', 'es_US');
  CREATE TYPE "public"."enum_site_settings_twitter_card_type" AS ENUM('summary', 'summary_large_image');
  CREATE TYPE "public"."enum_landing_page_services_bar_icon" AS ENUM('SprayCan', 'Car', 'Sparkles', 'Wind', 'ShieldCheck', 'Palette');
  CREATE TYPE "public"."enum_landing_page_about_section_stats_icon" AS ENUM('Users', 'Car', 'Award', 'Settings2', 'Trophy', 'Clock');
  CREATE TYPE "public"."enum_landing_page_cta_banner_cta_items_icon_name" AS ENUM('Wrench', 'CalendarDays', 'Car', 'Sparkles', 'SprayCan');
  ALTER TYPE "public"."enum_users_role" ADD VALUE 'user';
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
  
  CREATE TABLE "landing_page_hero_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar
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
  	"hero_background_image_id" integer,
  	"hero_cta_text" varchar DEFAULT 'Book Now',
  	"hero_cta_link" varchar DEFAULT '/booking',
  	"hero_show_phone_numbers" boolean DEFAULT true,
  	"hero_show_address" boolean DEFAULT true,
  	"about_section_title" varchar,
  	"about_section_subtitle" varchar,
  	"about_section_content" jsonb,
  	"about_section_image_id" integer,
  	"about_section_image_alt_text" varchar DEFAULT 'Professional car polishing service',
  	"about_section_experience_badge_text" varchar DEFAULT 'Years of Experience',
  	"about_section_book_now_text" varchar DEFAULT 'Book Now',
  	"services_section_section_subtitle" varchar DEFAULT 'OUR DETAILING PACKAGES',
  	"services_section_section_title" varchar DEFAULT 'Transform Your Vehicle with Our Expert Detailing',
  	"services_section_book_now_text" varchar DEFAULT 'Book Now',
  	"services_section_view_all_text" varchar DEFAULT 'View All Services',
  	"cta_banner_heading" varchar,
  	"cta_banner_description" varchar,
  	"cta_banner_button_text" varchar DEFAULT 'Book Now',
  	"cta_banner_button_link" varchar DEFAULT '/booking',
  	"cta_banner_background_image_id" integer,
  	"cta_banner_pre_heading" varchar DEFAULT 'Get Your Car Professionally Detailed',
  	"process_section_pre_heading" varchar DEFAULT '// OUR DETAILING METHOD',
  	"process_section_title" varchar DEFAULT 'Our Working Process',
  	"process_section_subtitle" varchar DEFAULT 'How we deliver exceptional results',
  	"process_section_image_alt_text" varchar DEFAULT 'Car detailing process in action',
  	"testimonials_section_title" varchar DEFAULT 'What Our Customers Say',
  	"testimonials_section_subtitle" varchar DEFAULT 'Real reviews from satisfied customers',
  	"brands_section_title" varchar DEFAULT 'Trusted by Leading Brands',
  	"brands_section_subtitle" varchar DEFAULT 'We work with all major car manufacturers',
  	"brands_section_book_your_make_text" varchar DEFAULT 'Book Your Make',
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
  
  CREATE TABLE "ui_labels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"modal_labels_get_in_touch" varchar DEFAULT 'Get In Touch',
  	"modal_labels_contact_info" varchar DEFAULT 'Contact Info',
  	"modal_labels_opening_hours" varchar DEFAULT 'Opening Hours',
  	"modal_labels_need_help" varchar DEFAULT 'Need Help?',
  	"navigation_labels_menu" varchar DEFAULT 'Menu',
  	"navigation_labels_close" varchar DEFAULT 'Close',
  	"navigation_labels_close_mobile_menu" varchar DEFAULT 'Close mobile menu',
  	"navigation_labels_toggle_mobile_menu" varchar DEFAULT 'Toggle mobile menu',
  	"buttons_book_now" varchar DEFAULT 'Book Now',
  	"buttons_view_all_services" varchar DEFAULT 'View All Services',
  	"buttons_book_your_make" varchar DEFAULT 'Book Your Make',
  	"buttons_get_in_touch" varchar DEFAULT 'Get in Touch',
  	"accessibility_close_modal" varchar DEFAULT 'Close modal',
  	"accessibility_professional_car_polishing" varchar DEFAULT 'Professional car polishing service',
  	"accessibility_car_detailing_process" varchar DEFAULT 'Car detailing process',
  	"accessibility_car_detailing_in_action" varchar DEFAULT 'Car detailing process in action',
  	"section_headers_our_detailing_packages" varchar DEFAULT 'OUR DETAILING PACKAGES',
  	"section_headers_transform_your_vehicle" varchar DEFAULT 'Transform Your Vehicle with Our Expert Detailing',
  	"section_headers_client_love" varchar DEFAULT 'CLIENT LOVE',
  	"section_headers_what_our_clients_say" varchar DEFAULT 'What Our Clients Say About Our Detailing',
  	"section_headers_we_detail_all_makes" varchar DEFAULT 'We Detail All Makes and Models',
  	"stats_labels_happy_clients" varchar DEFAULT 'Happy Clients',
  	"stats_labels_vehicles_detailed" varchar DEFAULT 'Vehicles Detailed',
  	"stats_labels_years_of_detailing" varchar DEFAULT 'Years of Detailing',
  	"stats_labels_detailing_awards" varchar DEFAULT 'Detailing Awards',
  	"stats_labels_years_of_experience" varchar DEFAULT 'Years of Experience',
  	"process_labels_wash_decon" varchar DEFAULT 'Wash & Decon',
  	"process_labels_paint_correction" varchar DEFAULT 'Paint Correction',
  	"process_labels_protection" varchar DEFAULT 'Protection',
  	"process_labels_interior_finishing" varchar DEFAULT 'Interior Finishing',
  	"cta_defaults_choose_your_package_title" varchar DEFAULT 'Choose Your Package',
  	"cta_defaults_choose_your_package_desc" varchar DEFAULT 'Select from our range of professional detailing services tailored to your needs.',
  	"cta_defaults_schedule_your_detail_title" varchar DEFAULT 'Schedule Your Detail',
  	"cta_defaults_schedule_your_detail_desc" varchar DEFAULT 'Pick a convenient time and our experts will come to you or visit our facility.',
  	"cta_defaults_enjoy_pristine_car_title" varchar DEFAULT 'Enjoy a Pristine Car',
  	"cta_defaults_enjoy_pristine_car_desc" varchar DEFAULT 'Drive away with confidence in your professionally detailed vehicle.',
  	"service_defaults_exterior_wash" varchar DEFAULT 'Exterior Wash',
  	"service_defaults_interior_detail" varchar DEFAULT 'Interior Detail',
  	"service_defaults_paint_correction" varchar DEFAULT 'Paint Correction',
  	"service_defaults_ceramic_coating" varchar DEFAULT 'Ceramic Coating',
  	"service_defaults_wheel_tire_care" varchar DEFAULT 'Wheel & Tire Care',
  	"service_defaults_odor_removal" varchar DEFAULT 'Odor Removal',
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
  
  ALTER TABLE "services_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_version_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_testimonials_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_brands_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_hero_slides" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_services_bar_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_transformation_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_cta_banner_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_process_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_process_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_page_v_version_hero_slides" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_page_v_version_services_bar_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_page_v_version_transformation_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_page_v_version_cta_banner_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_page_v_version_process_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_page_v_version_process_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_page_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_page_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_page_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "about_page_values_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_about_page_v_version_values_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_about_page_v_version_team_members" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_about_page_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "booking_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_booking_page_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_business_hours" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_site_settings_v_version_business_hours" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_site_settings_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_nav_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_header_v_version_nav_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_header_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_footer_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "services_features" CASCADE;
  DROP TABLE "services" CASCADE;
  DROP TABLE "_services_v_version_features" CASCADE;
  DROP TABLE "_services_v" CASCADE;
  DROP TABLE "_testimonials_v" CASCADE;
  DROP TABLE "_brands_v" CASCADE;
  DROP TABLE "home_page_hero_slides" CASCADE;
  DROP TABLE "home_page_services_bar_items" CASCADE;
  DROP TABLE "home_page_transformation_features" CASCADE;
  DROP TABLE "home_page_cta_banner_steps" CASCADE;
  DROP TABLE "home_page_process_steps" CASCADE;
  DROP TABLE "home_page_process_stats" CASCADE;
  DROP TABLE "home_page" CASCADE;
  DROP TABLE "home_page_rels" CASCADE;
  DROP TABLE "_home_page_v_version_hero_slides" CASCADE;
  DROP TABLE "_home_page_v_version_services_bar_items" CASCADE;
  DROP TABLE "_home_page_v_version_transformation_features" CASCADE;
  DROP TABLE "_home_page_v_version_cta_banner_steps" CASCADE;
  DROP TABLE "_home_page_v_version_process_steps" CASCADE;
  DROP TABLE "_home_page_v_version_process_stats" CASCADE;
  DROP TABLE "_home_page_v" CASCADE;
  DROP TABLE "_home_page_v_rels" CASCADE;
  DROP TABLE "_services_page_v" CASCADE;
  DROP TABLE "about_page_values_items" CASCADE;
  DROP TABLE "_about_page_v_version_values_items" CASCADE;
  DROP TABLE "_about_page_v_version_team_members" CASCADE;
  DROP TABLE "_about_page_v" CASCADE;
  DROP TABLE "booking_page" CASCADE;
  DROP TABLE "_booking_page_v" CASCADE;
  DROP TABLE "site_settings_business_hours" CASCADE;
  DROP TABLE "_site_settings_v_version_business_hours" CASCADE;
  DROP TABLE "_site_settings_v" CASCADE;
  DROP TABLE "header_nav_items" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "_header_v_version_nav_items" CASCADE;
  DROP TABLE "_header_v" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "_footer_v" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_services_fk";
  
  ALTER TABLE "services_page" DROP CONSTRAINT "services_page_meta_image_id_media_id_fk";
  
  ALTER TABLE "about_page_team_members" DROP CONSTRAINT "about_page_team_members_photo_id_media_id_fk";
  
  ALTER TABLE "about_page" DROP CONSTRAINT "about_page_meta_image_id_media_id_fk";
  
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_branding_logo_id_media_id_fk";
  
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_seo_image_id_media_id_fk";
  
  DROP INDEX "testimonials__order_idx";
  DROP INDEX "testimonials_deleted_at_idx";
  DROP INDEX "testimonials__status_idx";
  DROP INDEX "brands__order_idx";
  DROP INDEX "brands_deleted_at_idx";
  DROP INDEX "brands__status_idx";
  DROP INDEX "media_deleted_at_idx";
  DROP INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx";
  DROP INDEX "media_sizes_card_sizes_card_filename_idx";
  DROP INDEX "media_sizes_hero_sizes_hero_filename_idx";
  DROP INDEX "media_sizes_og_sizes_og_filename_idx";
  DROP INDEX "payload_locked_documents_rels_services_id_idx";
  DROP INDEX "services_page_hero_hero_image_idx";
  DROP INDEX "services_page_meta_meta_image_idx";
  DROP INDEX "services_page__status_idx";
  DROP INDEX "about_page_team_members_photo_idx";
  DROP INDEX "about_page_hero_hero_image_idx";
  DROP INDEX "about_page_story_story_image_idx";
  DROP INDEX "about_page_meta_meta_image_idx";
  DROP INDEX "about_page__status_idx";
  DROP INDEX "site_settings_branding_branding_logo_idx";
  DROP INDEX "site_settings_seo_seo_image_idx";
  DROP INDEX "site_settings__status_idx";
  ALTER TABLE "media" ALTER COLUMN "alt" DROP NOT NULL;
  ALTER TABLE "users" ALTER COLUMN "name" DROP NOT NULL;
  ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'user';
  ALTER TABLE "users" ALTER COLUMN "role" DROP NOT NULL;
  ALTER TABLE "services_page" ALTER COLUMN "hero_title" SET DEFAULT 'Our Premium Detailing Services';
  ALTER TABLE "services_page" ALTER COLUMN "hero_subtitle" SET DEFAULT 'Professional auto detailing services tailored to your needs';
  ALTER TABLE "services_page" ALTER COLUMN "cta_title" SET DEFAULT 'Ready to Transform Your Vehicle?';
  ALTER TABLE "services_page" ALTER COLUMN "cta_text" SET DEFAULT 'Schedule your detailing service today and experience the RPM difference.';
  ALTER TABLE "about_page" ALTER COLUMN "hero_title" SET DEFAULT 'About RPM Detailing';
  ALTER TABLE "about_page" ALTER COLUMN "hero_subtitle" SET DEFAULT 'Your trusted partner in premium auto detailing';
  ALTER TABLE "about_page" ALTER COLUMN "story_title" SET DEFAULT 'Our Story';
  ALTER TABLE "about_page" ALTER COLUMN "team_title" SET DEFAULT 'Meet Our Team';
  ALTER TABLE "about_page" ALTER COLUMN "team_subtitle" SET DEFAULT 'Dedicated professionals passionate about auto detailing';
  ALTER TABLE "about_page" ALTER COLUMN "cta_title" SET DEFAULT 'Let''s Work Together';
  ALTER TABLE "testimonials" ADD COLUMN "rating" numeric DEFAULT 5;
  ALTER TABLE "testimonials" ADD COLUMN "featured" boolean DEFAULT false;
  ALTER TABLE "brands" ADD COLUMN "order" numeric DEFAULT 0;
  ALTER TABLE "services_page" ADD COLUMN "hero_image_alt" varchar DEFAULT 'Services hero background';
  ALTER TABLE "services_page" ADD COLUMN "service_includes_label" varchar DEFAULT 'Service Includes:';
  ALTER TABLE "services_page" ADD COLUMN "starting_at_label" varchar DEFAULT 'Starting at';
  ALTER TABLE "services_page" ADD COLUMN "book_service_button_text" varchar DEFAULT 'Book This Service';
  ALTER TABLE "services_page" ADD COLUMN "cta_button_text" varchar DEFAULT 'Book Now';
  ALTER TABLE "services_page" ADD COLUMN "cta_button_link" varchar DEFAULT '/booking';
  ALTER TABLE "about_page_team_members" ADD COLUMN "image_id" integer;
  ALTER TABLE "about_page" ADD COLUMN "values_section_title" varchar DEFAULT 'Our Core Values';
  ALTER TABLE "about_page" ADD COLUMN "values_section_subtitle" varchar DEFAULT 'These principles guide everything we do and define who we are as a company';
  ALTER TABLE "about_page" ADD COLUMN "cta_button_text" varchar DEFAULT 'Get in Touch';
  ALTER TABLE "about_page" ADD COLUMN "cta_button_link" varchar DEFAULT '/booking';
  ALTER TABLE "site_settings" ADD COLUMN "company_name" varchar DEFAULT 'RPM Detailing';
  ALTER TABLE "site_settings" ADD COLUMN "phone" varchar DEFAULT '(425) 345-3564';
  ALTER TABLE "site_settings" ADD COLUMN "email" varchar DEFAULT 'support@rpm-detailing.com';
  ALTER TABLE "site_settings" ADD COLUMN "address" varchar DEFAULT 'Boise, ID, USA';
  ALTER TABLE "site_settings" ADD COLUMN "years_of_experience" numeric DEFAULT 20;
  ALTER TABLE "site_settings" ADD COLUMN "hours_weekdays" varchar DEFAULT 'Mon - Fri: 8.00 am - 6.00 pm';
  ALTER TABLE "site_settings" ADD COLUMN "hours_saturday" varchar DEFAULT 'Saturday: 9.00 am - 4.00 pm';
  ALTER TABLE "site_settings" ADD COLUMN "hours_sunday" varchar DEFAULT 'Sunday: Closed';
  ALTER TABLE "site_settings" ADD COLUMN "logo_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "dark_logo_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "description" varchar DEFAULT 'Your trusted partner for premium car detailing services. We restore and protect your vehicle''s beauty with meticulous care.';
  ALTER TABLE "site_settings" ADD COLUMN "copyright" varchar DEFAULT '© {year} RPM Detailing. All Rights Reserved.';
  ALTER TABLE "site_settings" ADD COLUMN "footer_section_titles_contact_info_title" varchar DEFAULT 'Contact Info';
  ALTER TABLE "site_settings" ADD COLUMN "footer_section_titles_opening_hours_title" varchar DEFAULT 'Opening Hours';
  ALTER TABLE "site_settings" ADD COLUMN "footer_c_t_a_heading" varchar DEFAULT 'Need Help?';
  ALTER TABLE "site_settings" ADD COLUMN "footer_c_t_a_text" varchar DEFAULT 'Ready for a showroom shine? Book your car detailing appointment today!';
  ALTER TABLE "site_settings" ADD COLUMN "footer_c_t_a_button_text" varchar DEFAULT 'Book Now';
  ALTER TABLE "site_settings" ADD COLUMN "footer_c_t_a_button_link" varchar DEFAULT '/booking';
  ALTER TABLE "site_settings" ADD COLUMN "header_c_t_a_show" boolean DEFAULT true;
  ALTER TABLE "site_settings" ADD COLUMN "header_c_t_a_text" varchar DEFAULT 'Book Now';
  ALTER TABLE "site_settings" ADD COLUMN "header_c_t_a_link" varchar DEFAULT '/booking';
  ALTER TABLE "site_settings" ADD COLUMN "calcom_enabled" boolean DEFAULT true;
  ALTER TABLE "site_settings" ADD COLUMN "calcom_link" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "calcom_event_slug" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "calcom_fallback_title" varchar DEFAULT 'Book Your Detailing Service';
  ALTER TABLE "site_settings" ADD COLUMN "calcom_fallback_message" varchar DEFAULT 'Online booking is currently unavailable. Please contact us directly to schedule your appointment.';
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
  ALTER TABLE "site_settings_contact_info_additional_phones" ADD CONSTRAINT "site_settings_contact_info_additional_phones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_navigation" ADD CONSTRAINT "site_settings_navigation_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_page_hero_slides" ADD CONSTRAINT "landing_page_hero_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page"("id") ON DELETE cascade ON UPDATE no action;
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
  ALTER TABLE "about_page_values" ADD CONSTRAINT "about_page_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "site_settings_contact_info_additional_phones_order_idx" ON "site_settings_contact_info_additional_phones" USING btree ("_order");
  CREATE INDEX "site_settings_contact_info_additional_phones_parent_id_idx" ON "site_settings_contact_info_additional_phones" USING btree ("_parent_id");
  CREATE INDEX "site_settings_navigation_order_idx" ON "site_settings_navigation" USING btree ("_order");
  CREATE INDEX "site_settings_navigation_parent_id_idx" ON "site_settings_navigation" USING btree ("_parent_id");
  CREATE INDEX "landing_page_hero_slides_order_idx" ON "landing_page_hero_slides" USING btree ("_order");
  CREATE INDEX "landing_page_hero_slides_parent_id_idx" ON "landing_page_hero_slides" USING btree ("_parent_id");
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
  CREATE INDEX "about_page_values_order_idx" ON "about_page_values" USING btree ("_order");
  CREATE INDEX "about_page_values_parent_id_idx" ON "about_page_values" USING btree ("_parent_id");
  ALTER TABLE "about_page_team_members" ADD CONSTRAINT "about_page_team_members_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_dark_logo_id_media_id_fk" FOREIGN KEY ("dark_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_open_graph_default_image_id_media_id_fk" FOREIGN KEY ("open_graph_default_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "services_page_hero_image_idx" ON "services_page" USING btree ("hero_image_id");
  CREATE INDEX "about_page_team_members_image_idx" ON "about_page_team_members" USING btree ("image_id");
  CREATE INDEX "about_page_hero_image_idx" ON "about_page" USING btree ("hero_image_id");
  CREATE INDEX "about_page_story_image_idx" ON "about_page" USING btree ("story_image_id");
  CREATE INDEX "site_settings_logo_idx" ON "site_settings" USING btree ("logo_id");
  CREATE INDEX "site_settings_dark_logo_idx" ON "site_settings" USING btree ("dark_logo_id");
  CREATE INDEX "site_settings_open_graph_open_graph_default_image_idx" ON "site_settings" USING btree ("open_graph_default_image_id");
  ALTER TABLE "testimonials" DROP COLUMN "_order";
  ALTER TABLE "testimonials" DROP COLUMN "deleted_at";
  ALTER TABLE "testimonials" DROP COLUMN "_status";
  ALTER TABLE "brands" DROP COLUMN "_order";
  ALTER TABLE "brands" DROP COLUMN "deleted_at";
  ALTER TABLE "brands" DROP COLUMN "_status";
  ALTER TABLE "media" DROP COLUMN "prefix";
  ALTER TABLE "media" DROP COLUMN "_objectkey";
  ALTER TABLE "media" DROP COLUMN "deleted_at";
  ALTER TABLE "media" DROP COLUMN "sizes_thumbnail_url";
  ALTER TABLE "media" DROP COLUMN "sizes_thumbnail_width";
  ALTER TABLE "media" DROP COLUMN "sizes_thumbnail_height";
  ALTER TABLE "media" DROP COLUMN "sizes_thumbnail_mime_type";
  ALTER TABLE "media" DROP COLUMN "sizes_thumbnail_filesize";
  ALTER TABLE "media" DROP COLUMN "sizes_thumbnail_filename";
  ALTER TABLE "media" DROP COLUMN "sizes_card_url";
  ALTER TABLE "media" DROP COLUMN "sizes_card_width";
  ALTER TABLE "media" DROP COLUMN "sizes_card_height";
  ALTER TABLE "media" DROP COLUMN "sizes_card_mime_type";
  ALTER TABLE "media" DROP COLUMN "sizes_card_filesize";
  ALTER TABLE "media" DROP COLUMN "sizes_card_filename";
  ALTER TABLE "media" DROP COLUMN "sizes_hero_url";
  ALTER TABLE "media" DROP COLUMN "sizes_hero_width";
  ALTER TABLE "media" DROP COLUMN "sizes_hero_height";
  ALTER TABLE "media" DROP COLUMN "sizes_hero_mime_type";
  ALTER TABLE "media" DROP COLUMN "sizes_hero_filesize";
  ALTER TABLE "media" DROP COLUMN "sizes_hero_filename";
  ALTER TABLE "media" DROP COLUMN "sizes_og_url";
  ALTER TABLE "media" DROP COLUMN "sizes_og_width";
  ALTER TABLE "media" DROP COLUMN "sizes_og_height";
  ALTER TABLE "media" DROP COLUMN "sizes_og_mime_type";
  ALTER TABLE "media" DROP COLUMN "sizes_og_filesize";
  ALTER TABLE "media" DROP COLUMN "sizes_og_filename";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "services_id";
  ALTER TABLE "services_page" DROP COLUMN "labels_includes";
  ALTER TABLE "services_page" DROP COLUMN "labels_price";
  ALTER TABLE "services_page" DROP COLUMN "labels_book_button_label";
  ALTER TABLE "services_page" DROP COLUMN "labels_book_button_url";
  ALTER TABLE "services_page" DROP COLUMN "cta_button_label";
  ALTER TABLE "services_page" DROP COLUMN "cta_button_url";
  ALTER TABLE "services_page" DROP COLUMN "meta_title";
  ALTER TABLE "services_page" DROP COLUMN "meta_description";
  ALTER TABLE "services_page" DROP COLUMN "meta_image_id";
  ALTER TABLE "services_page" DROP COLUMN "_status";
  ALTER TABLE "about_page_team_members" DROP COLUMN "photo_id";
  ALTER TABLE "about_page" DROP COLUMN "values_title";
  ALTER TABLE "about_page" DROP COLUMN "values_subtitle";
  ALTER TABLE "about_page" DROP COLUMN "cta_button_label";
  ALTER TABLE "about_page" DROP COLUMN "cta_button_url";
  ALTER TABLE "about_page" DROP COLUMN "meta_title";
  ALTER TABLE "about_page" DROP COLUMN "meta_description";
  ALTER TABLE "about_page" DROP COLUMN "meta_image_id";
  ALTER TABLE "about_page" DROP COLUMN "_status";
  ALTER TABLE "site_settings" DROP COLUMN "business_name";
  ALTER TABLE "site_settings" DROP COLUMN "business_phone";
  ALTER TABLE "site_settings" DROP COLUMN "business_email";
  ALTER TABLE "site_settings" DROP COLUMN "business_address";
  ALTER TABLE "site_settings" DROP COLUMN "business_years_of_experience";
  ALTER TABLE "site_settings" DROP COLUMN "branding_logo_id";
  ALTER TABLE "site_settings" DROP COLUMN "branding_brand_color";
  ALTER TABLE "site_settings" DROP COLUMN "seo_site_url";
  ALTER TABLE "site_settings" DROP COLUMN "seo_title_suffix";
  ALTER TABLE "site_settings" DROP COLUMN "seo_description";
  ALTER TABLE "site_settings" DROP COLUMN "seo_keywords";
  ALTER TABLE "site_settings" DROP COLUMN "seo_image_id";
  ALTER TABLE "site_settings" DROP COLUMN "seo_twitter_handle";
  ALTER TABLE "site_settings" DROP COLUMN "not_found_title";
  ALTER TABLE "site_settings" DROP COLUMN "not_found_message";
  ALTER TABLE "site_settings" DROP COLUMN "not_found_button_label";
  ALTER TABLE "site_settings" DROP COLUMN "_status";
  DROP TYPE "public"."enum_services_status";
  DROP TYPE "public"."enum__services_v_version_status";
  DROP TYPE "public"."enum_testimonials_status";
  DROP TYPE "public"."enum__testimonials_v_version_status";
  DROP TYPE "public"."enum_brands_status";
  DROP TYPE "public"."enum__brands_v_version_status";
  DROP TYPE "public"."enum_home_page_services_bar_items_icon";
  DROP TYPE "public"."enum_home_page_cta_banner_steps_icon";
  DROP TYPE "public"."enum_home_page_process_stats_icon";
  DROP TYPE "public"."enum_home_page_status";
  DROP TYPE "public"."enum__home_page_v_version_services_bar_items_icon";
  DROP TYPE "public"."enum__home_page_v_version_cta_banner_steps_icon";
  DROP TYPE "public"."enum__home_page_v_version_process_stats_icon";
  DROP TYPE "public"."enum__home_page_v_version_status";
  DROP TYPE "public"."enum_services_page_status";
  DROP TYPE "public"."enum__services_page_v_version_status";
  DROP TYPE "public"."enum_about_page_values_items_icon";
  DROP TYPE "public"."enum_about_page_status";
  DROP TYPE "public"."enum__about_page_v_version_values_items_icon";
  DROP TYPE "public"."enum__about_page_v_version_status";
  DROP TYPE "public"."enum_booking_page_status";
  DROP TYPE "public"."enum__booking_page_v_version_status";
  DROP TYPE "public"."enum_site_settings_status";
  DROP TYPE "public"."enum__site_settings_v_version_status";
  DROP TYPE "public"."enum_header_nav_items_type";
  DROP TYPE "public"."enum_header_status";
  DROP TYPE "public"."enum__header_v_version_nav_items_type";
  DROP TYPE "public"."enum__header_v_version_status";
  DROP TYPE "public"."enum_footer_status";
  DROP TYPE "public"."enum__footer_v_version_status";`)
}
