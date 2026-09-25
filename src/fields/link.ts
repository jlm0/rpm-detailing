import type { GroupField, TextFieldSingleValidation } from 'payload'
import { text } from 'payload/shared'

export const validateUrl: TextFieldSingleValidation = (value, options) => {
  if (!value) return 'A link is required'
  const valid = text(value, options)
  if (valid !== true) return valid
  if (/\s/.test(value)) return 'Links cannot contain spaces'
  return (
    /^(\/|#|https?:\/\/|mailto:|tel:)/.test(value) || 'Start with /, #, https://, mailto: or tel:'
  )
}

interface LinkOptions {
  name: string
  label?: string
  maxLabel?: number
}

export const link = ({ name, label, maxLabel = 24 }: LinkOptions): GroupField => ({
  name,
  label,
  type: 'group',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          maxLength: maxLabel,
          admin: {
            width: '50%',
            description: `Button text. Up to ${maxLabel} characters so it stays on one line.`,
          },
        },
        {
          name: 'url',
          label: 'Link',
          type: 'text',
          required: true,
          maxLength: 300,
          validate: validateUrl,
          admin: {
            width: '50%',
            description: 'A page like /booking, a home page section like #services, or a full URL',
          },
        },
      ],
    },
  ],
})
