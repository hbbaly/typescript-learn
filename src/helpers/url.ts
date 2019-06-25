import {isDate, isPlainObject, encode} from './utils'
export function buildURL (url: string, params?: any): string {
  // 不传params， url不做处理
  let parts:string[] = []
  let urlParams
  if (!params) return url
  Object.keys(params).forEach((key) => {
    let val = params[key]
    if (val === null || val === 'undefined') return
    let values = []
    // 是数组
    if (Array.isArray(val)) {
      values = val
      key +='[]'
    } else {
      values = [val]
    }
    values.forEach(val => {
      if (isDate(val)) val = val.toISOString()
      if (isPlainObject(val)) val = JSON.stringify(val)
      parts.push(`${encode(key)} = ${encode(val)}`)
    })
  })
  urlParams = parts.join('&')
  if (urlParams) {
    // 去除哈希标示
    let index = url.indexOf('#')
    if (index !== -1) {
      url = url.slice(0,index)
    }
    // 判断原先的url 有没有参数
    url += (url.indexOf('?') === -1 ? '?' : '&') + urlParams
  }
  return url
}