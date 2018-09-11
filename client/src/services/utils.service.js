const PORT = 4001
const STATIC_PATH = 'public'

export const omit = (obj, keys = []) => {
  if (!keys.length) return obj
  const out = {}
  Object.keys(obj)
        .filter((key) => !keys.includes(key))
        .forEach((key) => (out[key] = obj[key]))
  return out
}

export const getStaticLink = (url) => {
  return `${location.protocol}//${location.hostname}:${PORT}/${STATIC_PATH}/${url}`
}
