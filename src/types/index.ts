export type Method =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'delete'
  | 'Delete'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

export type XMLHttpRequestResponseType  = "" | "arraybuffer" | "blob" | "document" | "json" | "text"
export interface AxiosConfig {
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}
export interface AxiosResponseConfig {
  data: any
  headers:any
  status: number
  statusText: string
  request: any
  config: AxiosConfig
}
export interface AxiosPromise extends Promise<AxiosResponseConfig> {

}
export interface AxiosError extends Error{
  config: AxiosConfig
  code: string
  request: any
  response: AxiosResponseConfig
  isAxiosError: boolean
}
// 给axios混合对象定义公共方法
export interface Axios {
  request(config: AxiosConfig):AxiosPromise
  get(url: string, config?: AxiosConfig):AxiosPromise
  head(url: string, config?: AxiosConfig):AxiosPromise
  delete(url: string, config?: AxiosConfig):AxiosPromise
  options(url: string, config?: AxiosConfig):AxiosPromise
  post(url: string,data?: any, config?: AxiosConfig):AxiosPromise
  put(url: string,data?: any, config?: AxiosConfig):AxiosPromise
  patch(url: string,data?: any, config?: AxiosConfig):AxiosPromise
}

export interface AxiosInstance extends Axios {
  (config: AxiosConfig): AxiosPromise
  (url: string, config?: AxiosConfig): AxiosPromise
}

