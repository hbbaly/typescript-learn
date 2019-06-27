import { AxiosConfig, AxiosPromise, AxiosResponseConfig} from '../types'
import xhr from '../xhr'
import { buildURL } from '../helpers/url'
import { transformRequest, transformResponse } from '../helpers/data'
import { processHeaders } from '../helpers/headers'
function processConfig (config: AxiosConfig): void {
  config.url = transformUrl(config)
  config.headers = transformHeaders(config)
  config.data  = transformData(config)
}
function transformUrl (config: AxiosConfig):string {
  const { url, params } = config
  return buildURL(url!, params)
}
function transformData (config: AxiosConfig): any {
  return transformRequest(config.data)
}
function transformHeaders (config: AxiosConfig): void {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}
function transformResponseData(res: AxiosResponseConfig): AxiosResponseConfig {
  res.data = transformResponse(res.data)
  return res
}
export default function dispatchRequest(config: AxiosConfig): AxiosPromise {
  // todo
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}