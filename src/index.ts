import { AxiosConfig } from './types/index'
import xhr from './xhr'
import { buildURL } from './helpers/url'
import { transformRequest } from './helpers/data'
import { processHeaders } from './helpers/headers'
function processConfig (config: AxiosConfig): void {
  config.url = transformUrl(config)
  config.headers = transformHeaders(config)
  config.data  = transformData(config)
}
function transformUrl (config: AxiosConfig):string {
  const { url, params } = config
  return buildURL(url, params)
}
function transformData (config: AxiosConfig): any {
  return transformRequest(config.data)
}
function transformHeaders (config: AxiosConfig): void {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}
export default function axios(config: AxiosConfig): void {
  // todo
  processConfig(config)
  xhr(config)
}