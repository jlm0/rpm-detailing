'use client'

import { useEffect, useRef } from 'react'

import { prefersFinePointerMotion } from './fine-pointer'

export function Spotlight() {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const glow = ref.current
    const card = glow?.parentElement?.parentElement
    if (!glow || !card || !prefersFinePointerMotion()) return

    let frame = 0
    const move = (event: PointerEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const box = card.getBoundingClientRect()
        glow.style.translate = `${String(event.clientX - box.left)}px ${String(event.clientY - box.top)}px`
      })
    }

    card.addEventListener('pointermove', move)
    return () => {
      card.removeEventListener('pointermove', move)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden opacity-0 transition-opacity duration-base group-hover/card:opacity-100 group-hover/card:duration-quick motion-reduce:hidden"
    >
      <span
        ref={ref}
        className="absolute -top-48 -left-48 size-96 rounded-full bg-[radial-gradient(closest-side,rgb(255_255_255/0.1),transparent)]"
      />
    </span>
  )
}
