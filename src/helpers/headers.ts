
import { isPlainObject } from './utils'
// 判断 原有的headers与标准headers
function normalizaHeaders (headers: any, normalizaHeadersName: string): void{
  if (!headers) return
  Object.keys(headers).forEach(val => {
    if (val !== normalizaHeadersName && val.toUpperCase() === normalizaHeadersName.toUpperCase()) {
      headers[normalizaHeadersName] = headers[val]
      delete headers[val]
    }
  })
}
export function processHeaders (headers: any, data: any): any {
  normalizaHeaders(headers, 'Content-Type')
  if (isPlainObject(data)) {
    // 添加默认的'Content-Type'
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}
export function parseResponseHeaders (headers: string): any {
  let parseObject = Object.create(null)
  if (!headers) return 

  headers.split('\r\n').forEach(val => {
    let [key, value] = val.split(':')
    key = key.trim().toLowerCase()
    if (!key) return
    if (value) value = value.trim().toLowerCase()
    parseObject[key] = value
  })
  return parseObject
}