export function setItem(key, val) {
  sessionStorage.setItem(key, JSON.stringify(val))
}

export function getItem(key) {
  return JSON.parse(sessionStorage.getItem(key))
}

export function removeItem(key) {
  sessionStorage.removeItem(key)
}
