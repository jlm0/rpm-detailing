'use client'

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from 'react'

interface RevealProps {
  children: ReactNode
  variant?: 'rise' | 'fade'
  order?: number
  stagger?: boolean
  className?: string
}

const InGroup = createContext(false)

let observer: IntersectionObserver | undefined

const observe = (element: HTMLElement) => {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.removeAttribute('data-reveal-pending')
        observer?.unobserve(entry.target)
      }
    },
    { rootMargin: '0px 0px -8% 0px' },
  )
  observer.observe(element)
}

export default function Reveal({
  children,
  variant = 'rise',
  order = 0,
  stagger = false,
  className,
}: RevealProps) {
  const inGroup = useContext(InGroup)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element || inGroup || !('IntersectionObserver' in window)) return
    if (element.getBoundingClientRect().top < window.innerHeight * 0.92) return
    element.setAttribute('data-reveal-pending', '')
    observe(element)
    return () => observer?.unobserve(element)
  }, [inGroup])

  const style = inGroup ? undefined : ({ '--reveal-order': order } as CSSProperties)

  return (
    <InGroup.Provider value={stagger}>
      <div ref={ref} className={className} style={style} data-reveal={stagger ? 'group' : variant}>
        {children}
      </div>
    </InGroup.Provider>
  )
}
