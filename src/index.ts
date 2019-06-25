import { AxiosConfig } from './types/index'
import xhr from './xhr'
import { buildURL } from './helpers/url'
function processConfig (config: AxiosConfig): void {
  config.url = transformUrl(config)
}
function transformUrl (config: AxiosConfig):string {
  const { url, params } = config
  return buildURL(url, params)
}
export default function axios(config: AxiosConfig): void {
  // todo
  processConfig(config)
  xhr(config)
}