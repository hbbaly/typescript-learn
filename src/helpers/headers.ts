
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
  console.log(headers, 'lheader')
  return headers
}