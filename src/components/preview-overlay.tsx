'use client'

import { useEffect, useState, useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'

import { adminPath, siteMap, trail, type SitePart } from '@/lib/site-map'
import { cn } from '@/lib/utils'

interface Target {
  element: HTMLElement
  label: string
  edit: string
  list?: { label: string; href: string }
  placement: keyof typeof placements
}

const placements = {
  start: 'top-3 left-3',
  end: 'top-3 right-3',
  below: 'top-full left-1/2 mt-2 -translate-x-1/2',
}

const describe = (element: HTMLElement): Target => {
  const [slug = '', name] = (element.dataset.cms ?? '').split('/')
  const part = (siteMap as Record<string, SitePart | undefined>)[slug]
  if (!part) {
    const heading = element.querySelector('h2, h3')?.textContent.trim() ?? 'Package'
    return {
      element,
      label: trail('Service Packages', heading),
      edit: adminPath(slug, name),
      placement: 'end',
    }
  }
  const section = name ? part.sections[name] : undefined
  return {
    element,
    label: section ? trail(part.label, section.label) : part.label,
    edit: adminPath(slug),
    list: section?.collection && {
      label: section.collection.label,
      href: `/admin/collections/${section.collection.slug}`,
    },
    placement: element.tagName === 'HEADER' ? 'below' : 'start',
  }
}

const sameElements = (targets: Target[], elements: HTMLElement[]) =>
  targets.length === elements.length &&
  targets.every((target, index) => target.element === elements[index])

const subscribeToNothing = () => () => undefined

export function PreviewOverlay() {
  const framed = useSyncExternalStore(
    subscribeToNothing,
    () => window.self !== window.top,
    () => true,
  )
  const [visible, setVisible] = useState(true)
  const [targets, setTargets] = useState<Target[]>([])

  useEffect(() => {
    if (framed) return
    let frame = 0
    const scan = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const elements = [...document.querySelectorAll<HTMLElement>('[data-cms]')]
        setTargets((previous) =>
          sameElements(previous, elements) ? previous : elements.map(describe),
        )
      })
    }
    scan()
    const observer = new MutationObserver(scan)
    observer.observe(document.body, { childList: true, subtree: true })
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [framed])

  useEffect(() => {
    if (framed || !visible) return
    const restores = targets.map(({ element }) => {
      const { outline, outlineOffset, position } = element.style
      element.style.outline = '1px dashed rgb(217 35 45 / 0.55)'
      element.style.outlineOffset = '-1px'
      if (getComputedStyle(element).position === 'static') element.style.position = 'relative'
      return () => {
        Object.assign(element.style, { outline, outlineOffset, position })
      }
    })
    return () => {
      for (const restore of restores) restore()
    }
  }, [targets, visible, framed])

  if (framed) return null

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setVisible((value) => !value)
        }}
        className="font-semibold text-white transition-colors hover:text-brandRed"
      >
        {visible ? 'Hide labels' : 'Show labels'}
      </button>
      {visible &&
        targets.map(({ element, label, edit, list, placement }) =>
          createPortal(
            <div
              data-preview-label
              className={cn(
                'absolute z-40 flex items-center gap-1 rounded-full bg-brandInk/90 py-1 pr-1 pl-3 font-sans text-xs font-medium tracking-normal text-white normal-case shadow-lg ring-1 ring-white/15 backdrop-blur-sm',
                placements[placement],
              )}
            >
              <span className="mr-1">{label}</span>
              <a
                href={edit}
                className="rounded-full bg-white/10 px-2.5 py-0.5 font-semibold transition-colors hover:bg-brandRed"
              >
                Edit
              </a>
              {list && (
                <a
                  href={list.href}
                  className="rounded-full px-2.5 py-0.5 text-white/75 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {list.label}
                </a>
              )}
            </div>,
            element,
            edit + label,
          ),
        )}
    </>
  )
}
