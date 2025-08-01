import * as migration_20250731_205715 from './20250731_205715';
import * as migration_20250731_231650_add_hero_slides from './20250731_231650_add_hero_slides';
import * as migration_20250731_233919_add_ui_labels_and_content_fields from './20250731_233919_add_ui_labels_and_content_fields';
import * as migration_20250801_000842_add_about_page_section_headers from './20250801_000842_add_about_page_section_headers';
import * as migration_20250801_002405_add_services_page_labels from './20250801_002405_add_services_page_labels';

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
    name: '20250801_002405_add_services_page_labels'
  },
];
