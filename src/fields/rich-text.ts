import {
  BoldFeature,
  InlineToolbarFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  UnorderedListFeature,
} from '@payloadcms/richtext-lexical'
import type { RichTextField } from 'payload'
import { richText as validateRichText } from 'payload/shared'

interface TextNode {
  text?: string
  children?: TextNode[]
}

const plainTextLength = (node: TextNode | undefined): number =>
  (node?.text?.length ?? 0) +
  (node?.children ?? []).reduce((total, child) => total + plainTextLength(child), 0)

interface RichTextOptions {
  name: string
  max: number
  help: string
}

export const richText = ({ name, max, help }: RichTextOptions): RichTextField => ({
  name,
  type: 'richText',
  required: true,
  editor: lexicalEditor({
    features: [
      ParagraphFeature(),
      BoldFeature(),
      ItalicFeature(),
      LinkFeature({ enabledCollections: [] }),
      UnorderedListFeature(),
      OrderedListFeature(),
      InlineToolbarFeature(),
    ],
  }),
  admin: {
    description: `${help} Paragraphs, bold, italic, links and lists. Up to ${max} characters.`,
  },
  validate: async (value, options) => {
    const valid = await validateRichText(value, options)
    if (valid !== true) return valid
    const length = plainTextLength((value as { root?: TextNode } | null | undefined)?.root)
    return length <= max || `Keep this under ${max} characters (currently ${length}).`
  },
})
