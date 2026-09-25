import type { TextareaField, TextField, TextFieldSingleValidation } from 'payload'

interface LimitedText {
  name: string
  max: number
  help: string
  label?: string
  min?: number
  required?: boolean
  width?: string
}

type LimitedTextField = LimitedText & { validate?: TextFieldSingleValidation }

const describe = (help: string, max: number) => `${help} Up to ${max} characters.`

export const text = ({
  name,
  max,
  help,
  label,
  min,
  required = true,
  width,
  validate,
}: LimitedTextField): TextField => ({
  name,
  label,
  type: 'text',
  required,
  maxLength: max,
  minLength: min,
  validate,
  admin: { description: describe(help, max), width },
})

export const textarea = ({
  name,
  max,
  help,
  label,
  min,
  required = true,
  width,
}: LimitedText): TextareaField => ({
  name,
  label,
  type: 'textarea',
  required,
  maxLength: max,
  minLength: min,
  admin: { description: describe(help, max), width, rows: Math.min(8, Math.ceil(max / 80)) },
})

export const eyebrow = text({
  name: 'eyebrow',
  max: 40,
  help: 'Small red capitals above the heading.',
})

export const screenReaderLabel = (name: string, label: string, example: string) =>
  text({
    name,
    label,
    max: 40,
    help: `Not shown on screen. Read aloud by screen readers, for example ${example}.`,
    width: '50%',
  })
