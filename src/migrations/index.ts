import * as migration_20250731_205715 from './20250731_205715';
import * as migration_20250731_231650_add_hero_slides from './20250731_231650_add_hero_slides';
import * as migration_20250731_233919_add_ui_labels_and_content_fields from './20250731_233919_add_ui_labels_and_content_fields';
import * as migration_20250801_000842_add_about_page_section_headers from './20250801_000842_add_about_page_section_headers';
import * as migration_20250801_002405_add_services_page_labels from './20250801_002405_add_services_page_labels';
import * as migration_20250802_014246_add_seo_metadata_fields from './20250802_014246_add_seo_metadata_fields';
import * as migration_20250809_141833_add_vercel_blob_storage from './20250809_141833_add_vercel_blob_storage';
import * as migration_20260924_235217_payload_3_90_upgrade from './20260924_235217_payload_3_90_upgrade';

export const migrations = [
  {
    up: migration_20250731_205715.up,
    down: migration_20250731_205715.down,
    name: '20250731_205715',
  },
  {
    up: migration_20250731_231650_add_hero_slides.up,
    down: migration_20250731_231650_add_hero_slides.down,
    name: '20250731_231650_add_hero_slides',
  },
  {
    up: migration_20250731_233919_add_ui_labels_and_content_fields.up,
    down: migration_20250731_233919_add_ui_labels_and_content_fields.down,
    name: '20250731_233919_add_ui_labels_and_content_fields',
  },
  {
    up: migration_20250801_000842_add_about_page_section_headers.up,
    down: migration_20250801_000842_add_about_page_section_headers.down,
    name: '20250801_000842_add_about_page_section_headers',
  },
  {
    up: migration_20250801_002405_add_services_page_labels.up,
    down: migration_20250801_002405_add_services_page_labels.down,
    name: '20250801_002405_add_services_page_labels',
  },
  {
    up: migration_20250802_014246_add_seo_metadata_fields.up,
    down: migration_20250802_014246_add_seo_metadata_fields.down,
    name: '20250802_014246_add_seo_metadata_fields',
  },
  {
    up: migration_20250809_141833_add_vercel_blob_storage.up,
    down: migration_20250809_141833_add_vercel_blob_storage.down,
    name: '20250809_141833_add_vercel_blob_storage',
  },
  {
    up: migration_20260924_235217_payload_3_90_upgrade.up,
    down: migration_20260924_235217_payload_3_90_upgrade.down,
    name: '20260924_235217_payload_3_90_upgrade'
  },
];
