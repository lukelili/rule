export function setItem(key, val) {
  sessionStorage.setItem(key, JSON.stringify(val))
}

export function getItem(key) {
  try {
    return JSON.parse(sessionStorage.getItem(key))
  } catch (err) {
    return ''
  }
}

export function removeItem(key) {
  sessionStorage.removeItem(key)
}
