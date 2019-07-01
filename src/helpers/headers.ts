
import { isPlainObject, deepMerge } from './utils'
import { Method } from '../types';
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

export function flattenHeaders(headers: any, method: Method): any {
  if (!headers) {
    return headers
  }
  // 合并headers， headers.common,  headers[method]
  headers = deepMerge(headers.common || {}, headers[method] || {}, headers)

  const methodsToDelete = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'common']
  // 然后再把headers上的methodsToDelete中包含属性 删除
  methodsToDelete.forEach(method => {
    delete headers[method]
  })

  return headers
}