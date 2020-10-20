// 外部参数 替换 默认配置
export function lteration(param, options) {
  const keys = Object.keys(param)
  if (!keys.length) return
  keys.forEach(item => {
    if (Object.prototype.hasOwnProperty.call(options, item)) {
      if (Object.prototype.toString.call(param[item]) === '[object Object]') {
        lteration(param[item], options[item])
      } else {
        options[item] = param[item]
      }
    }
  })
  return options
}
