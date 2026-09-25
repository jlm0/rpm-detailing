export const previewPath = (path: string) =>
  `/next/preview?${new URLSearchParams({ path }).toString()}`
