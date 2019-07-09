import { AxiosConfig, AxiosPromise, AxiosResponseConfig} from '../types'
import xhr from '../xhr'
import { buildURL } from '../helpers/url'
// import { transformRequest, transformResponse } from '../helpers/data'
import { flattenHeaders } from '../helpers/headers'
import transform from './transform';
function processConfig (config: AxiosConfig): void {
  config.url = transformUrl(config)
  // config.headers = transformHeaders(config)
  // config.data  = transformData(config)
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method!)
}
function transformUrl (config: AxiosConfig):string {
  const { url, params, paramsSerializer } = config
  return buildURL(url!, params, paramsSerializer)
}
// function transformData (config: AxiosConfig): any {
//   return transformRequest(config.data)
// }
// function transformHeaders (config: AxiosConfig): void {
//   const { headers = {}, data } = config
//   return processHeaders(headers, data)
// }
function transformResponseData(res: AxiosResponseConfig): AxiosResponseConfig {
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}
function throwIfCancellationRequested (config: AxiosConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested()
  }
}
export default function dispatchRequest(config: AxiosConfig): AxiosPromise {
  // todo
  throwIfCancellationRequested(config)
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}