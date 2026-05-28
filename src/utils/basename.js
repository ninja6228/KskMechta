/** basename для React Router (без завершающего слэша) */
export function getRouterBasename() {
  const base = import.meta.env.BASE_URL
  if (!base || base === '/') return undefined
  return base.replace(/\/$/, '')
}
