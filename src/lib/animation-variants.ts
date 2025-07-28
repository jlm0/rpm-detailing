export const defaultTransition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] as const }

export const animationVariants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: defaultTransition },
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: defaultTransition },
  },
  fadeInDown: {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: defaultTransition },
  },
  slideInLeft: {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: defaultTransition },
  },
  slideInRight: {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: defaultTransition },
  },
  zoomIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: defaultTransition },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1, transition: defaultTransition },
  },
  slideInUp: {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0, transition: defaultTransition },
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: defaultTransition },
  },
}

export type AnimationVariantName = keyof typeof animationVariants