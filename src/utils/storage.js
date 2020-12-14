export function getItem (key) {
  const item = window.localStorage.getItem(key)
  try{
    return JSON.parse(item)
  }catch {
    return item
  }
}

export function setItem(key, val) {
  window.localStorage.setItem(key, JSON.stringify(val))
}

export function removeItem(key) {
  window.localStorage.removeItem(key)
}

export function clear() {
  window.localStorage.clear()
}