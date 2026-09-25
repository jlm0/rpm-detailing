'use client'

import { motion, type Variants } from 'framer-motion'
import { createContext, useContext, type ReactNode } from 'react'

import { animationVariants, type AnimationVariantName } from '@/lib/animation-variants'

interface ScrollAnimateProps {
  children: ReactNode
  variantName?: AnimationVariantName
  delay?: number
  className?: string
  staggerChildren?: number
  once?: boolean
}

const StaggerContext = createContext(false)

export default function ScrollAnimate({
  children,
  variantName = 'fadeInUp',
  delay = 0,
  className,
  staggerChildren,
  once = true,
}: ScrollAnimateProps) {
  const inheritsTrigger = useContext(StaggerContext)
  const { hidden, visible } = animationVariants[variantName]

  const variants: Variants = {
    hidden,
    visible: {
      ...visible,
      transition: {
        ...visible.transition,
        delay,
        ...(staggerChildren && { staggerChildren, delayChildren: delay }),
      },
    },
  }

  const trigger = inheritsTrigger
    ? {}
    : {
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once, amount: 0, margin: '0px 0px -48px 0px' },
      }

  return (
    <StaggerContext.Provider value={Boolean(staggerChildren)}>
      <motion.div className={className} variants={variants} {...trigger}>
        {children}
      </motion.div>
    </StaggerContext.Provider>
  )
}
