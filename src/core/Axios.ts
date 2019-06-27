import { AxiosConfig, AxiosPromise, Method} from '../types'
import dispatchRequest from './dispatch';
export default class Axios{
  request(url: any, config?: any):AxiosPromise{
    if (typeof url === 'string') {
      if (!config) config = {}
      config.url = url
    } else {
      config = url
    }
    return dispatchRequest(config)
  }
  get(url: string, config?:AxiosConfig): AxiosPromise{
    return this._requestWithNoData('get', url, config)
  }
  delete(url: string, config?:AxiosConfig): AxiosPromise{
    return this._requestWithNoData('delete', url, config)
  }
  head(url: string, config?:AxiosConfig): AxiosPromise{
    return this._requestWithNoData('head', url, config)
  }
  options(url: string, config?:AxiosConfig): AxiosPromise{
    return this._requestWithNoData('options', url, config)
  }
  post(url: string,data?: any, config?:AxiosConfig): AxiosPromise{
    return this._requestWithData('post', url, data, config)
  }
  put(url: string,data?: any, config?:AxiosConfig): AxiosPromise{
    return this._requestWithData('put', url, data, config)
  }
  patch(url: string,data?: any, config?:AxiosConfig): AxiosPromise{
    return this._requestWithData('patch', url, data, config)
  }

  _requestWithNoData(method: Method,url: string, config?: AxiosConfig) {
    return this.request(Object.assign(
      {
        method,
        url
      },
      config || {}
    ))
  }
  _requestWithData(method: Method,url: string, data?: any, config?: AxiosConfig) {
    return this.request(Object.assign(
      {
        method,
        url,
        data
      },
      config || {}
    ))
  }
}