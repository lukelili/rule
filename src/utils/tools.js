import Vue from 'vue'
/**
 * 来源对象 深层 匹配 目标对象
 * @param { Object } source
 * @param { target } target
*/
export function deepMatch(source, target) {
  if (!Object.keys(source).length) return
  for (const key in source) {
    if (isIn(target, key)) {
      if (isObject(source[key])) {
        deepMatch(source[key], target[key])
      } else {
        target[key] = source[key]
      }
    }
  }
  return target
}

/**
 * @param { Object } target
 * @param { property } key
 * @return { Boolean } 对象集合包含某属性 返回true
*/
export function isIn(target, key) {
  return Object.prototype.hasOwnProperty.call(target, key)
}

/**
 * @param { Object } data
 * @return { Boolean } 对象类型 返回true
 **/
export function isObject(data) {
  return Object.prototype.toString.call(data) === '[object Object]'
}

Vue.prototype.$deepMatch = deepMatch

