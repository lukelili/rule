export function setItem(key, val) {
  val && sessionStorage.setItem(key, JSON.stringify(val))
}

export function getItem(key) {
  const data = sessionStorage[key]
  if (data) {
    return JSON.parse(data)
  } else {
    return false
  }
}

export function removeItem(key) {
  sessionStorage.removeItem(key)
}