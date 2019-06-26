import { AxiosConfig } from './types/index'
import xhr from './xhr'
import { buildURL } from './helpers/url'
import { transformRequest } from './helpers/data'
function processConfig (config: AxiosConfig): void {
  config.url = transformUrl(config)
  config.data  = transformData(config)
}
function transformUrl (config: AxiosConfig):string {
  const { url, params } = config
  return buildURL(url, params)
}
function transformData (config: AxiosConfig): any {
  return transformRequest(config.data)
}
export default function axios(config: AxiosConfig): void {
  // todo
  processConfig(config)
  xhr(config)
}