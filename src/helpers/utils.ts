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
