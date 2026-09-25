'use client'

import { useEffect, useRef, type ReactNode } from 'react'

import { cn } from '@/lib/utils'

import { prefersFinePointerMotion } from './fine-pointer'

const MAX_SHIFT = { x: 4, y: 3 }

export function Magnetic({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element || !prefersFinePointerMotion()) return

    let box = element.getBoundingClientRect()
    const enter = () => {
      box = element.getBoundingClientRect()
    }
    const move = (event: PointerEvent) => {
      const x = (event.clientX - box.left) / box.width - 0.5
      const y = (event.clientY - box.top) / box.height - 0.5
      element.style.translate = `${String(x * 2 * MAX_SHIFT.x)}px ${String(y * 2 * MAX_SHIFT.y)}px`
    }
    const leave = () => {
      element.style.translate = ''
    }

    element.addEventListener('pointerenter', enter)
    element.addEventListener('pointermove', move)
    element.addEventListener('pointerleave', leave)
    return () => {
      element.removeEventListener('pointerenter', enter)
      element.removeEventListener('pointermove', move)
      element.removeEventListener('pointerleave', leave)
    }
  }, [])

  return (
    <span
      ref={ref}
      className={cn('inline-flex transition-[translate] duration-base ease-enter', className)}
    >
      {children}
    </span>
  )
}
