import { text, textarea } from '@/fields/text'
import { matches } from '@/fields/validate'

import { editableGlobal, section, seoTab } from './shared'

const page = 'booking-page'

const validateCalLink = matches(
  /^[\w-]+$/,
  'Use only letters, numbers, dashes and underscores, no spaces',
)

export const BookingPage = editableGlobal({
  slug: page,
  description:
    'The Booking page, top to bottom, plus what shows if the calendar fails or booking is off.',
  fields: [
    {
      type: 'tabs',
      tabs: [
        section(page, 'content', [
          text({ name: 'backLabel', max: 24, help: 'The link back to the home page, top left.' }),
          text({
            name: 'title',
            max: 60,
            help: 'The large page heading. Keep it short so it fits on three lines on phones.',
          }),
          textarea({
            name: 'intro',
            max: 240,
            help: 'Shown under the heading. {business} is replaced with the business name.',
          }),
          text({ name: 'loadingText', max: 60, help: 'Shown while the calendar loads.' }),
          text({ name: 'helpText', max: 80, help: 'Shown in the box under the calendar.' }),
          {
            type: 'row',
            fields: [
              text({
                name: 'phoneLabel',
                max: 16,
                help: 'Shown before the phone number.',
                width: '50%',
              }),
              text({
                name: 'emailLabel',
                max: 16,
                help: 'Shown before the email address.',
                width: '50%',
              }),
            ],
          },
        ]),
        section(page, 'calendar', [
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
                maxLength: 60,
                validate: validateCalLink,
                admin: {
                  width: '50%',
                  description: 'The part after cal.com/, for example rpm-detailing',
                },
              },
              {
                name: 'eventSlug',
                label: 'Event',
                type: 'text',
                maxLength: 60,
                validate: validateCalLink,
                admin: { width: '50%', description: 'Optional event name, for example detail' },
              },
            ],
          },
        ]),
        section(page, 'calendarError', [
          text({ name: 'title', max: 60, help: 'Shown if the calendar fails to load.' }),
          textarea({ name: 'message', max: 200, help: 'One or two sentences.' }),
          {
            type: 'row',
            fields: [
              text({ name: 'retryLabel', max: 24, help: 'Button text.', width: '50%' }),
              text({
                name: 'callLabel',
                max: 40,
                help: 'Shown above the phone number.',
                width: '50%',
              }),
            ],
          },
        ]),
        section(page, 'unavailable', [
          text({ name: 'title', max: 60, help: 'Shown when online booking is turned off.' }),
          textarea({
            name: 'message',
            max: 200,
            help: '{phone} is replaced with the business phone number.',
          }),
          text({ name: 'buttonLabel', max: 24, help: 'Button back to the home page.' }),
        ]),
        seoTab(page),
      ],
    },
  ],
})
