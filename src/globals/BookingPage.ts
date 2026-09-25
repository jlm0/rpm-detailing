import { editableGlobal, section, seoTab } from './shared'

export const BookingPage = editableGlobal({
  slug: 'booking-page',
  label: 'Booking',
  group: 'Pages',
  previewAt: '/booking',
  fields: [
    {
      type: 'tabs',
      tabs: [
        section('calendar', 'Calendar', [
          {
            name: 'enabled',
            label: 'Online booking is on',
            type: 'checkbox',
            defaultValue: true,
            admin: {
              description: 'Turn off to show the unavailable message instead of the calendar',
            },
          },
          {
            type: 'row',
            fields: [
              {
                name: 'calLink',
                label: 'Cal.com username',
                type: 'text',
                required: true,
                admin: {
                  width: '50%',
                  description: 'The part after cal.com/, for example rpm-detailing',
                },
              },
              {
                name: 'eventSlug',
                label: 'Event',
                type: 'text',
                admin: { width: '50%', description: 'Optional event name, for example detail' },
              },
            ],
          },
        ]),
        section('content', 'Page text', [
          { name: 'backLabel', type: 'text', required: true },
          { name: 'title', type: 'text', required: true },
          {
            name: 'intro',
            type: 'textarea',
            required: true,
            admin: { description: '{business} is replaced with the business name' },
          },
          { name: 'loadingText', type: 'text', required: true },
          { name: 'helpText', type: 'text', required: true },
          {
            type: 'row',
            fields: [
              { name: 'phoneLabel', type: 'text', required: true, admin: { width: '50%' } },
              { name: 'emailLabel', type: 'text', required: true, admin: { width: '50%' } },
            ],
          },
        ]),
        section('calendarError', 'Calendar error', [
          { name: 'title', type: 'text', required: true },
          { name: 'message', type: 'textarea', required: true },
          { name: 'retryLabel', type: 'text', required: true },
          { name: 'callLabel', type: 'text', required: true },
        ]),
        section('unavailable', 'Booking off', [
          { name: 'title', type: 'text', required: true },
          {
            name: 'message',
            type: 'textarea',
            required: true,
            admin: { description: '{phone} is replaced with the business phone number' },
          },
          { name: 'buttonLabel', type: 'text', required: true },
        ]),
        seoTab,
      ],
    },
  ],
})
