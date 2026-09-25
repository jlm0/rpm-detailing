import type { NumberFieldSingleValidation, TextFieldSingleValidation } from 'payload'
import { number, text } from 'payload/shared'

export const matches =
  (pattern: RegExp, message: string): TextFieldSingleValidation =>
  (value, options) => {
    const valid = text(value, options)
    if (valid !== true || !value) return valid
    return pattern.test(value) || message
  }

export const wholeNumber: NumberFieldSingleValidation = (value, options) => {
  const valid = number(value, options)
  if (valid !== true || value == null) return valid
  return Number.isInteger(value) || 'Use a whole number'
}
