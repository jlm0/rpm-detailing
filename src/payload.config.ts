import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { buildConfig } from "payload";
import path from "path";
import { fileURLToPath } from "url";
import type { Access } from "payload";
import sharp from 'sharp';

import type { User } from "./payload-types";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const isAdmin: Access<User> = ({ req: { user } }) => {
  return Boolean(user && user.role === "admin");
};

const isAdminOrSelf: Access<User> = ({ req: { user } }) => {
  if (user?.role === "admin") {
    return true;
  }
  if (user) {
    return {
      id: {
        equals: user.id,
      },
    };
  }
  return false;
};

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || "http://localhost:3000",
  admin: {
    user: "users",
    meta: {
      title: "RPM Detailing CMS",
      titleSuffix: "- RPM Detailing",
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  globals: [
    {
      slug: "site-settings",
      label: "Site Settings",
      admin: {
        description: "Global settings for the entire website including company info, navigation, and branding",
      },
      access: {
        read: () => true,
        update: isAdmin,
      },
      fields: [
        {
          type: "tabs",
          tabs: [
            {
              label: "Company Info",
              fields: [
                {
                  name: "companyName",
                  type: "text",
                  required: true,
                  defaultValue: "RPM Detailing",
                },
                {
                  name: "phone",
                  type: "text",
                  required: true,
                  defaultValue: "(425) 345-3564",
                },
                {
                  name: "email",
                  type: "email",
                  required: true,
                  defaultValue: "support@rpm-detailing.com",
                },
                {
                  name: "address",
                  type: "text",
                  required: true,
                  defaultValue: "Boise, ID, USA",
                },
                {
                  name: "yearsOfExperience",
                  type: "number",
                  label: "Years of Experience",
                  defaultValue: 20,
                },
                {
                  name: "hours",
                  type: "group",
                  fields: [
                    {
                      name: "weekdays",
                      type: "text",
                      defaultValue: "Mon - Fri: 8.00 am - 6.00 pm",
                    },
                    {
                      name: "saturday",
                      type: "text",
                      defaultValue: "Saturday: 9.00 am - 4.00 pm",
                    },
                    {
                      name: "sunday",
                      type: "text",
                      defaultValue: "Sunday: Closed",
                    },
                  ],
                },
                {
                  name: "contactInfo",
                  type: "group",
                  label: "Additional Contact Info",
                  fields: [
                    {
                      name: "additionalPhones",
                      type: "array",
                      label: "Additional Phone Numbers",
                      fields: [
                        {
                          name: "number",
                          type: "text",
                          required: true,
                        },
                        {
                          name: "label",
                          type: "text",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              label: "Branding",
              fields: [
                {
                  name: "logo",
                  type: "upload",
                  relationTo: "media",
                  required: true,
                  admin: {
                    description: "Light version of the logo for dark backgrounds",
                  },
                },
                {
                  name: "darkLogo",
                  type: "upload",
                  relationTo: "media",
                  required: true,
                  admin: {
                    description: "Dark version of the logo for light backgrounds",
                  },
                },
                {
                  name: "description",
                  type: "textarea",
                  label: "Footer Description",
                  defaultValue:
                    "Your trusted partner for premium car detailing services. We restore and protect your vehicle's beauty with meticulous care.",
                },
                {
                  name: "copyright",
                  type: "text",
                  defaultValue: "© {year} RPM Detailing. All Rights Reserved.",
                  admin: {
                    description: "Use {year} to automatically insert the current year",
                  },
                },
              ],
            },
            {
              label: "Footer CTA",
              fields: [
                {
                  name: "footerCTA",
                  type: "group",
                  label: "Footer Call-to-Action",
                  fields: [
                    {
                      name: "heading",
                      type: "text",
                      defaultValue: "Need Help?",
                    },
                    {
                      name: "text",
                      type: "text",
                      defaultValue: "Ready for a showroom shine? Book your car detailing appointment today!",
                    },
                    {
                      name: "buttonText",
                      type: "text",
                      defaultValue: "Book Now",
                    },
                    {
                      name: "buttonLink",
                      type: "text",
                      defaultValue: "/booking",
                    },
                  ],
                },
              ],
            },
            {
              label: "Navigation",
              fields: [
                {
                  name: "navigation",
                  type: "array",
                  label: "Navigation Menu",
                  admin: {
                    description: "Main navigation menu items. Items will be sorted by order number.",
                  },
                  fields: [
                    {
                      name: "label",
                      type: "text",
                      required: true,
                    },
                    {
                      name: "link",
                      type: "text",
                      required: true,
                      admin: {
                        description: "Use / for home, /services for services page, #section-name for sections",
                      },
                    },
                    {
                      name: "order",
                      type: "number",
                      defaultValue: 0,
                    },
                  ],
                },
                {
                  name: "headerCTA",
                  type: "group",
                  label: "Header Call-to-Action",
                  fields: [
                    {
                      name: "show",
                      type: "checkbox",
                      label: "Show CTA Button",
                      defaultValue: true,
                    },
                    {
                      name: "text",
                      type: "text",
                      defaultValue: "Book Now",
                    },
                    {
                      name: "link",
                      type: "text",
                      defaultValue: "/booking",
                    },
                  ],
                },
              ],
            },
            {
              label: "Integrations",
              fields: [
                {
                  name: "calcom",
                  type: "group",
                  label: "Cal.com Integration",
                  fields: [
                    {
                      name: "enabled",
                      type: "checkbox",
                      label: "Enable Cal.com Booking",
                      defaultValue: true,
                    },
                    {
                      name: "link",
                      type: "text",
                      label: "Cal.com Booking Link",
                      required: true,
                      admin: {
                        description: 'Your Cal.com username or team slug (e.g., "yourname" for cal.com/yourname)',
                      },
                    },
                    {
                      name: "eventSlug",
                      type: "text",
                      label: "Event Type Slug",
                      admin: {
                        description: 'Optional: specific event type slug (e.g., "30min" for cal.com/yourname/30min)',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      slug: "landing-page",
      label: "Landing Page",
      admin: {
        description: "Manage all content sections for the home/landing page",
      },
      access: {
        read: () => true,
        update: isAdmin,
      },
      fields: [
        {
          type: "tabs",
          tabs: [
            {
              label: "Hero Section",
              fields: [
                {
                  name: "hero",
                  type: "group",
                  label: "Hero Content",
                  admin: {
                    description: "The main banner section at the top of the landing page",
                  },
                  fields: [
                    {
                      name: "title",
                      type: "text",
                      required: true,
                    },
                    {
                      name: "subtitle",
                      type: "text",
                    },
                    {
                      name: "backgroundImage",
                      type: "upload",
                      relationTo: "media",
                      required: true,
                    },
                    {
                      name: "ctaText",
                      type: "text",
                      defaultValue: "Book Now",
                    },
                    {
                      name: "ctaLink",
                      type: "text",
                      defaultValue: "/booking",
                    },
                    {
                      name: "showPhoneNumbers",
                      type: "checkbox",
                      label: "Show Phone Numbers",
                      defaultValue: true,
                    },
                    {
                      name: "showAddress",
                      type: "checkbox",
                      label: "Show Address",
                      defaultValue: true,
                    },
                  ],
                },
              ],
            },
            {
              label: "Services Overview",
              fields: [
                {
                  name: "servicesBar",
                  type: "array",
                  label: "Services Bar Items",
                  admin: {
                    description: "Quick overview of services shown below the hero section",
                  },
                  fields: [
                    {
                      name: "order",
                      type: "number",
                      required: true,
                    },
                    {
                      name: "icon",
                      type: "select",
                      options: [
                        { label: "Spray Can", value: "SprayCan" },
                        { label: "Car", value: "Car" },
                        { label: "Sparkles", value: "Sparkles" },
                        { label: "Wind", value: "Wind" },
                        { label: "Shield Check", value: "ShieldCheck" },
                        { label: "Palette", value: "Palette" },
                      ],
                    },
                    {
                      name: "title",
                      type: "text",
                      required: true,
                    },
                    {
                      name: "description",
                      type: "text",
                      required: true,
                    },
                  ],
                },
              ],
            },
            {
              label: "About Section",
              fields: [
                {
                  name: "aboutSection",
                  type: "group",
                  label: "About Us Section",
                  admin: {
                    description: "Brief about section on the landing page",
                  },
                  fields: [
                    {
                      name: "title",
                      type: "text",
                      required: true,
                    },
                    {
                      name: "subtitle",
                      type: "text",
                    },
                    {
                      name: "content",
                      type: "richText",
                      editor: lexicalEditor({}),
                    },
                    {
                      name: "image",
                      type: "upload",
                      relationTo: "media",
                    },
                    {
                      name: "features",
                      type: "array",
                      fields: [
                        {
                          name: "feature",
                          type: "text",
                        },
                      ],
                    },
                    {
                      name: "stats",
                      type: "array",
                      label: "Statistics",
                      fields: [
                        {
                          name: "value",
                          type: "text",
                          required: true,
                        },
                        {
                          name: "label",
                          type: "text",
                          required: true,
                        },
                        {
                          name: "icon",
                          type: "select",
                          options: [
                            { label: "Users", value: "Users" },
                            { label: "Car", value: "Car" },
                            { label: "Award", value: "Award" },
                            { label: "Settings 2", value: "Settings2" },
                            { label: "Trophy", value: "Trophy" },
                            { label: "Clock", value: "Clock" },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              label: "Services Details",
              fields: [
                {
                  name: "detailedServices",
                  type: "array",
                  label: "Detailed Service Packages",
                  admin: {
                    description: "Detailed service packages shown on the landing page",
                  },
                  fields: [
                    {
                      name: "order",
                      type: "number",
                      required: true,
                    },
                    {
                      name: "packageId",
                      type: "text",
                      required: true,
                    },
                    {
                      name: "title",
                      type: "text",
                      required: true,
                    },
                    {
                      name: "description",
                      type: "textarea",
                      required: true,
                    },
                    {
                      name: "image",
                      type: "upload",
                      relationTo: "media",
                    },
                  ],
                },
              ],
            },
            {
              label: "CTA Banner",
              fields: [
                {
                  name: "ctaBanner",
                  type: "group",
                  label: "Call-to-Action Banner",
                  admin: {
                    description: "Mid-page call-to-action section with process steps",
                  },
                  fields: [
                    {
                      name: "heading",
                      type: "text",
                      required: true,
                    },
                    {
                      name: "description",
                      type: "textarea",
                      required: true,
                    },
                    {
                      name: "buttonText",
                      type: "text",
                      defaultValue: "Book Now",
                    },
                    {
                      name: "buttonLink",
                      type: "text",
                      defaultValue: "/booking",
                    },
                    {
                      name: "backgroundImage",
                      type: "upload",
                      relationTo: "media",
                    },
                    {
                      name: "preHeading",
                      type: "text",
                      label: "Pre-heading Text",
                      defaultValue: "Get Your Car Professionally Detailed",
                    },
                    {
                      name: "ctaItems",
                      type: "array",
                      label: "3-Step Process Items",
                      minRows: 3,
                      maxRows: 3,
                      fields: [
                        {
                          name: "title",
                          type: "text",
                          required: true,
                        },
                        {
                          name: "description",
                          type: "text",
                          required: true,
                        },
                        {
                          name: "iconName",
                          type: "select",
                          options: [
                            { label: "Wrench", value: "Wrench" },
                            { label: "Calendar Days", value: "CalendarDays" },
                            { label: "Car", value: "Car" },
                            { label: "Sparkles", value: "Sparkles" },
                            { label: "Spray Can", value: "SprayCan" },
                          ],
                          required: true,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              label: "Process Section",
              fields: [
                {
                  name: "processSection",
                  type: "group",
                  label: "Working Process Section",
                  fields: [
                    {
                      name: "preHeading",
                      type: "text",
                      defaultValue: "// OUR DETAILING METHOD",
                      admin: {
                        description: "Small text above the main title",
                      },
                    },
                    {
                      name: "title",
                      type: "text",
                      defaultValue: "Our Working Process",
                    },
                    {
                      name: "subtitle",
                      type: "text",
                      defaultValue: "How we deliver exceptional results",
                    },
                    {
                      name: "steps",
                      type: "array",
                      label: "Process Steps",
                      fields: [
                        {
                          name: "order",
                          type: "number",
                          required: true,
                        },
                        {
                          name: "title",
                          type: "text",
                          required: true,
                        },
                        {
                          name: "active",
                          type: "checkbox",
                          defaultValue: false,
                        },
                        {
                          name: "description",
                          type: "textarea",
                          label: "Step Description",
                        },
                        {
                          name: "image",
                          type: "upload",
                          relationTo: "media",
                          label: "Process Step Image",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              label: "Testimonials",
              fields: [
                {
                  name: "testimonialsSection",
                  type: "group",
                  label: "Testimonials Section",
                  fields: [
                    {
                      name: "title",
                      type: "text",
                      defaultValue: "What Our Customers Say",
                    },
                    {
                      name: "subtitle",
                      type: "text",
                      defaultValue: "Real reviews from satisfied customers",
                    },
                  ],
                },
              ],
            },
            {
              label: "Brands",
              fields: [
                {
                  name: "brandsSection",
                  type: "group",
                  label: "Brands Section",
                  fields: [
                    {
                      name: "title",
                      type: "text",
                      defaultValue: "Trusted by Leading Brands",
                    },
                    {
                      name: "subtitle",
                      type: "text",
                      defaultValue: "We work with all major car manufacturers",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      slug: "services-page",
      label: "Services Page",
      admin: {
        description: "Manage content for the dedicated services page",
      },
      access: {
        read: () => true,
        update: isAdmin,
      },
      fields: [
        {
          name: "heroTitle",
          type: "text",
          required: true,
          defaultValue: "Our Premium Detailing Services",
        },
        {
          name: "heroSubtitle",
          type: "text",
          defaultValue: "Professional auto detailing services tailored to your needs",
        },
        {
          name: "heroImage",
          type: "upload",
          relationTo: "media",
        },
        {
          name: "services",
          type: "array",
          label: "Detailed Services",
          fields: [
            {
              name: "title",
              type: "text",
              required: true,
            },
            {
              name: "description",
              type: "richText",
              editor: lexicalEditor({}),
            },
            {
              name: "features",
              type: "array",
              label: "Service Features",
              fields: [
                {
                  name: "feature",
                  type: "text",
                },
              ],
            },
            {
              name: "image",
              type: "upload",
              relationTo: "media",
            },
            {
              name: "price",
              type: "text",
              label: "Starting Price",
            },
            {
              name: "duration",
              type: "text",
              label: "Service Duration",
            },
          ],
        },
        {
          name: "ctaTitle",
          type: "text",
          defaultValue: "Ready to Transform Your Vehicle?",
        },
        {
          name: "ctaText",
          type: "text",
          defaultValue: "Schedule your detailing service today and experience the RPM difference.",
        },
        {
          name: "ctaButtonText",
          type: "text",
          defaultValue: "Book Now",
        },
        {
          name: "ctaButtonLink",
          type: "text",
          defaultValue: "/booking",
        },
      ],
    },
    {
      slug: "about-page",
      label: "About Page",
      admin: {
        description: "Manage content for the about us page",
      },
      access: {
        read: () => true,
        update: isAdmin,
      },
      fields: [
        {
          name: "heroTitle",
          type: "text",
          required: true,
          defaultValue: "About RPM Detailing",
        },
        {
          name: "heroSubtitle",
          type: "text",
          defaultValue: "Your trusted partner in premium auto detailing",
        },
        {
          name: "heroImage",
          type: "upload",
          relationTo: "media",
        },
        {
          name: "storyTitle",
          type: "text",
          defaultValue: "Our Story",
        },
        {
          name: "storyContent",
          type: "richText",
          editor: lexicalEditor({}),
        },
        {
          name: "storyImage",
          type: "upload",
          relationTo: "media",
        },
        {
          name: "values",
          type: "array",
          label: "Our Values",
          fields: [
            {
              name: "title",
              type: "text",
              required: true,
            },
            {
              name: "description",
              type: "text",
            },
            {
              name: "icon",
              type: "text",
              label: "Icon Name",
              admin: {
                description: "Lucide icon name (e.g., Shield, Star, Heart)",
              },
            },
          ],
        },
        {
          name: "teamTitle",
          type: "text",
          defaultValue: "Meet Our Team",
        },
        {
          name: "teamSubtitle",
          type: "text",
          defaultValue: "Dedicated professionals passionate about auto detailing",
        },
        {
          name: "teamMembers",
          type: "array",
          label: "Team Members",
          fields: [
            {
              name: "name",
              type: "text",
              required: true,
            },
            {
              name: "position",
              type: "text",
            },
            {
              name: "bio",
              type: "textarea",
            },
            {
              name: "image",
              type: "upload",
              relationTo: "media",
            },
          ],
        },
        {
          name: "ctaTitle",
          type: "text",
          defaultValue: "Let's Work Together",
        },
        {
          name: "ctaButtonText",
          type: "text",
          defaultValue: "Get in Touch",
        },
        {
          name: "ctaButtonLink",
          type: "text",
          defaultValue: "/booking",
        },
      ],
    },
  ],
  collections: [
    {
      slug: "users",
      auth: true,
      access: {
        create: isAdmin,
        read: isAdminOrSelf,
        update: isAdminOrSelf,
        delete: isAdmin,
      },
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
        },
        {
          name: "role",
          type: "select",
          options: [
            { label: "Admin", value: "admin" },
            { label: "User", value: "user" },
          ],
          required: true,
          defaultValue: "user",
          admin: {
            position: "sidebar",
          },
        },
      ],
    },
    {
      slug: "media",
      upload: {
        staticDir: path.resolve(dirname, "../public/uploads"),
        mimeTypes: ["image/*"],
      },
      access: {
        read: () => true,
        create: isAdmin,
        update: isAdmin,
        delete: isAdmin,
      },
      fields: [
        {
          name: "alt",
          type: "text",
          required: true,
        },
      ],
    },
    {
      slug: "testimonials",
      labels: {
        singular: "Testimonial",
        plural: "Testimonials",
      },
      admin: {
        useAsTitle: "name",
        description: "Customer testimonials displayed on the landing page",
        group: "Content",
      },
      access: {
        read: () => true,
        create: isAdmin,
        update: isAdmin,
        delete: isAdmin,
      },
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
        },
        {
          name: "title",
          type: "text",
          required: true,
          admin: {
            description: "Customer's title or vehicle type (e.g., 'Tesla Model 3 Owner')",
          },
        },
        {
          name: "review",
          type: "textarea",
          required: true,
        },
        {
          name: "avatar",
          type: "upload",
          relationTo: "media",
        },
        {
          name: "rating",
          type: "number",
          min: 1,
          max: 5,
          defaultValue: 5,
        },
        {
          name: "featured",
          type: "checkbox",
          label: "Featured Testimonial",
          defaultValue: false,
        },
      ],
    },
    {
      slug: "brands",
      labels: {
        singular: "Brand",
        plural: "Brands",
      },
      admin: {
        useAsTitle: "name",
        description: "Car brands/manufacturers displayed on the landing page",
        group: "Content",
      },
      access: {
        read: () => true,
        create: isAdmin,
        update: isAdmin,
        delete: isAdmin,
      },
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
        },
        {
          name: "logo",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        {
          name: "order",
          type: "number",
          defaultValue: 0,
        },
      ],
    },
  ],
  editor: lexicalEditor({}),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
  }),
  secret: process.env.PAYLOAD_SECRET || "",
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});