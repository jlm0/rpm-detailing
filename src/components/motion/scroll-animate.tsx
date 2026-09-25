'use client'

import { motion, type Variants } from 'framer-motion'
import type React from 'react'
import { useInView } from 'react-intersection-observer'

import { animationVariants, type AnimationVariantName } from '@/lib/animation-variants'

interface ScrollAnimateProps {
  children: React.ReactNode
  variantName?: AnimationVariantName
  delay?: number
  className?: string
  staggerChildren?: number
  amount?: number // Viewport amount to trigger animation (0 to 1)
  once?: boolean // Trigger animation only once
}

const ScrollAnimate: React.FC<ScrollAnimateProps> = ({
  children,
  variantName = 'fadeInUp',
  delay = 0,
  className = '',
  staggerChildren,
  amount = 0.3, // Trigger when 30% of the element is in view
  once = true,
}) => {
  const { ref, inView } = useInView({
    triggerOnce: once,
    threshold: amount,
    rootMargin: '-100px',
  })

  const selectedVariant = animationVariants[variantName]

  const variantsWithDelay: Variants = {
    hidden: selectedVariant.hidden,
    visible: {
      ...selectedVariant.visible,
      transition: {
        ...selectedVariant.visible.transition,
        delay: delay,
        ...(staggerChildren && { when: 'beforeChildren' as const }),
        staggerChildren: staggerChildren,
      },
    },
  }

  return (
    <motion.div
      className={className}
      ref={ref}
      variants={variantsWithDelay}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {children}
    </motion.div>
  )
}

export default ScrollAnimate
