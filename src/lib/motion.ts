export const ease = {
  enter: [0.22, 1, 0.36, 1],
  exit: [0.4, 0, 1, 1],
  standard: [0.4, 0, 0.2, 1],
} as const

export const duration = {
  press: 0.1,
  quick: 0.2,
  base: 0.35,
  slow: 0.6,
} as const
