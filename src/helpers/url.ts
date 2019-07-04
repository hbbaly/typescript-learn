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

interface originUrl{
  protocol: string
  host:string
}
// 同域名的判断主要利用了一个技巧，创建一个 a 标签的 DOM，然后设置 href 属性为我们传入的 url，然后可以获取该 DOM 的 protocol、host。
//当前页面的 url 和请求的 url 都通过这种方式获取，然后对比它们的 protocol 和 host 是否相同即可。
const urlParsingNode = document.createElement('a')
const currentOrigin = resolveUrl(window.location.href)

function resolveUrl (url: string):originUrl {
  urlParsingNode.setAttribute('href', url)
  const { protocol, host } = urlParsingNode
  return {
    protocol,
    host
  }
}
export function isSameOrigin (requestUrl: string):boolean {
  const parsedOrigin = resolveUrl(requestUrl)
  return (parsedOrigin.protocol === currentOrigin.protocol && parsedOrigin.host === currentOrigin.host)
}