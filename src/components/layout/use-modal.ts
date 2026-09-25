import { useEffect, useRef, type RefObject } from 'react'

const focusable =
  'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])'

export function useModal(container: RefObject<HTMLElement | null>, onClose: () => void) {
  const close = useRef(onClose)

  useEffect(() => {
    close.current = onClose
  }, [onClose])

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null
    const elements = () => [...(container.current?.querySelectorAll<HTMLElement>(focusable) ?? [])]

    elements()[0]?.focus()
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close.current()
        return
      }
      if (event.key !== 'Tab') return
      const items = elements()
      const first = items.at(0)
      const last = items.at(-1)
      if (!first || !last) return
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
      previouslyFocused?.focus()
    }
  }, [container])
}
