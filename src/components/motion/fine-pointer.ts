export const prefersFinePointerMotion = () =>
  window.matchMedia(
    '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
  ).matches
