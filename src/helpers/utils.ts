const toString = Object.prototype.toString 
/**
 * 判断是否为日期类型数据
 * @param val 传入参数
 */
export function isDate (val: any): val is Date {
  return toString.call(val) === '[object Date]'
}
/**
 * 判断是否为对象类型数据
 * @param val 传入参数
 */
export function isObject (val: any): val is Object {
  return val !== null && typeof val === 'object'
}
/**
 * 判断具体是否为对象
 * @param val 
 */
export function isPlainObject (val: any): val is Object {
  return toString.call(val) === '[object Object]'
}
/**
 * url进行encode
 * @param val string
 */
export function encode (val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}
// 交叉类型，并且用到了类型断言
// extend 的最终目的是把 from 里的属性都扩展到 to 中，包括原型上的属性。
export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}
// 深拷贝
export function deepMerge(...objs: any[]): any {
  const result = Object.create(null)

  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        if (isPlainObject(val)) {
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          } else {
            result[key] = deepMerge(val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })

  return result
}
export function isFormData (val:any) {
  return val !== 'undefined' && val instanceof FormData
}
export function isURLSearchParams(val: any): val is URLSearchParams {
  return val !== 'undefined' && val instanceof URLSearchParams
}