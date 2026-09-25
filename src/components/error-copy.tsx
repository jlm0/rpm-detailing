'use client'

import { createContext, useContext, type ReactNode } from 'react'

import type { SiteSetting } from '@/payload-types'

type ErrorCopy = SiteSetting['errorPage'] & { businessName: string }

const ErrorCopyContext = createContext<ErrorCopy | null>(null)

export function ErrorCopyProvider({ value, children }: { value: ErrorCopy; children: ReactNode }) {
  return <ErrorCopyContext value={value}>{children}</ErrorCopyContext>
}

export const useErrorCopy = () => useContext(ErrorCopyContext)
