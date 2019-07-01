import { AxiosConfig, AxiosPromise, Method, AxiosResponseConfig, ResolvedFn, RejectedFn} from '../types'
import dispatchRequest from './dispatch';
import AxiosInterceptorManager from './interceptor';
import mergeConfig from './mergeConfig';
// // Interceptors 类型拥有 2 个属性，一个请求拦截器管理类实例，一个是响应拦截器管理类实例。
interface Interceptors{
  request: AxiosInterceptorManager<AxiosConfig>
  response: AxiosInterceptorManager<AxiosResponseConfig>
}
interface PromiseChain<T>{
  resolved: ResolvedFn | ((config: AxiosConfig) => AxiosPromise)
  rejected?: RejectedFn
}
// 实例化 Axios 类的时候，在它的构造器去初始化这个 interceptors 实例属性
export default class Axios{
  defaults: AxiosConfig
  interceptors: Interceptors
  constructor (initDefaults: AxiosConfig) {
    this.defaults = initDefaults
    this.interceptors= {
      request: new AxiosInterceptorManager<AxiosConfig>(),
      response: new AxiosInterceptorManager<AxiosResponseConfig>()

    }
  }
  request(url: any, config?: any):AxiosPromise{
    if (typeof url === 'string') {
      if (!config) config = {}
      config.url = url
    } else {
      config = url
    }
    // 合并config
    config = mergeConfig(this.defaults, config)
    // 构造一个 PromiseChain 类型的数组 chain, dispatchRequest 函数赋值给 resolved 属性
    const chain: PromiseChain<any>[] = [
      {
        resolved: dispatchRequest,
        rejected: undefined
      }
    ]
    // 先遍历请求拦截器插入到 chain 的前面
    this.interceptors.request.forEach(interceptor=> {
      chain.unshift(interceptor)
    })
    //遍历响应拦截器插入到 chain 后面
    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor)
    })
    //一个已经 resolve 的 promise，循环这个 chain，拿到每个拦截器对象，把它们的 resolved 函数和 rejected 函数添加到 promise.then 的参数中
    let promise = Promise.resolve(config)
    while(chain.length) {
      const {resolved, rejected} = chain.shift()!
      promise = promise.then(resolved, rejected)
    }
    return promise
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