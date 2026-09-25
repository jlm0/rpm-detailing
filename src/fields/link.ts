import type { GroupField, TextFieldSingleValidation } from 'payload'

const validateUrl: TextFieldSingleValidation = (value) => {
  if (!value) return 'A link is required'
  return (
    /^(\/|#|https?:\/\/|mailto:|tel:)/.test(value) || 'Start with /, #, https://, mailto: or tel:'
  )
}

export const link = ({ name, label }: { name: string; label?: string }): GroupField => ({
  name,
  label,
  type: 'group',
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'label', type: 'text', required: true, admin: { width: '50%' } },
        {
          name: 'url',
          label: 'Link',
          type: 'text',
          required: true,
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
