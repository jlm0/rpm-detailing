import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
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
  
  ALTER TABLE "site_settings" ADD COLUMN "footer_section_titles_contact_info_title" varchar DEFAULT 'Contact Info';
  ALTER TABLE "site_settings" ADD COLUMN "footer_section_titles_opening_hours_title" varchar DEFAULT 'Opening Hours';
  ALTER TABLE "landing_page" ADD COLUMN "about_section_image_alt_text" varchar DEFAULT 'Professional car polishing service';
  ALTER TABLE "landing_page" ADD COLUMN "about_section_experience_badge_text" varchar DEFAULT 'Years of Experience';
  ALTER TABLE "landing_page" ADD COLUMN "about_section_book_now_text" varchar DEFAULT 'Book Now';
  ALTER TABLE "landing_page" ADD COLUMN "services_section_section_subtitle" varchar DEFAULT 'OUR DETAILING PACKAGES';
  ALTER TABLE "landing_page" ADD COLUMN "services_section_section_title" varchar DEFAULT 'Transform Your Vehicle with Our Expert Detailing';
  ALTER TABLE "landing_page" ADD COLUMN "services_section_book_now_text" varchar DEFAULT 'Book Now';
  ALTER TABLE "landing_page" ADD COLUMN "services_section_view_all_text" varchar DEFAULT 'View All Services';
  ALTER TABLE "landing_page" ADD COLUMN "process_section_image_alt_text" varchar DEFAULT 'Car detailing process in action';
  ALTER TABLE "landing_page" ADD COLUMN "brands_section_book_your_make_text" varchar DEFAULT 'Book Your Make';`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "ui_labels" CASCADE;
  ALTER TABLE "site_settings" DROP COLUMN "footer_section_titles_contact_info_title";
  ALTER TABLE "site_settings" DROP COLUMN "footer_section_titles_opening_hours_title";
  ALTER TABLE "landing_page" DROP COLUMN "about_section_image_alt_text";
  ALTER TABLE "landing_page" DROP COLUMN "about_section_experience_badge_text";
  ALTER TABLE "landing_page" DROP COLUMN "about_section_book_now_text";
  ALTER TABLE "landing_page" DROP COLUMN "services_section_section_subtitle";
  ALTER TABLE "landing_page" DROP COLUMN "services_section_section_title";
  ALTER TABLE "landing_page" DROP COLUMN "services_section_book_now_text";
  ALTER TABLE "landing_page" DROP COLUMN "services_section_view_all_text";
  ALTER TABLE "landing_page" DROP COLUMN "process_section_image_alt_text";
  ALTER TABLE "landing_page" DROP COLUMN "brands_section_book_your_make_text";`)
}
