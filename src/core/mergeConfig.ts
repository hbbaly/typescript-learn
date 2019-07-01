import { AxiosConfig, AxiosResponseConfig } from "../types";
import { isPlainObject, deepMerge } from "../helpers/utils";
const strats = Object.create(null)
function defaultStrat (val1:any, val2: any): any{
  return typeof val2 !== 'undefined' ? val2 : val1
}
function val2Strat(val1:any, val2: any): any{
  if (typeof val2 !== 'undefined') return val2
}
// url, params, data数据都是已config2为主，不用默认属性
const stratKeysConfig2 = ['url', 'params', 'data']
stratKeysConfig2.forEach(key => {
  strats[key] = val2Strat
})
function deepMergeStrat (val1:any, val2: any): any {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2)
  }else if (typeof val2 !== 'undefined') {
    return val2
  } else if (isPlainObject(val1)) {
    return deepMerge(val1)
  } else if (typeof val1 !== 'undefined') {
    return val1
  }
}
// headers 属性需要进行合并
const stratKeysDeepMerge = ['headers']

stratKeysDeepMerge.forEach(key => {
  strats[key] = deepMergeStrat
})
// 合并方法的整体思路就是对 config1 和 config2 中的属性遍历，执行 mergeField 方法做合并，这里 config1 代表默认配置，config2 代表自定义配置。
export default function mergeConfig(config1: AxiosConfig, config2?: AxiosConfig): AxiosConfig {
  if (!config2) config2 = {}
  const config = Object.create(null)
  function mergeFile (key: string): void{
    const strat = strats[key] || defaultStrat
    config[key] = strat(config1[key], config2![key])
  }
  for (let key in config2) {
    mergeFile(key)
  }
  for (let key in config1) {
    // config2[key]唯空的时候， defaultStrat调用取config1内的配置
    if (!config2[key]) mergeFile(key)
  }
  return config
}