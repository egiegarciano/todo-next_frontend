export const waitUntil = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
