
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
  [propName:string]: any
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
  transformRequest?: Transformer|Transformer[]
  transformResponse?: Transformer|Transformer[]
  cancelToken?: CancelToken
  withCredentials?: boolean
  xsrfCookieName?: string
  xsrfHeaderName?: string
  onDownLoadProcess? (e: ProgressEvent):void
  onUploadProgress?: (e: ProgressEvent) => void
  auth?: AxiosBasicCredentials
  validateStatus?: (status: number) => boolean
  paramsSerializer?: (params: any) => string
}
export interface AxiosResponseConfig<T = any> {
  data: T
  headers:any
  status: number
  statusText: string
  request: any
  config: AxiosConfig
}
export interface AxiosPromise<T = any> extends Promise<AxiosResponseConfig<T>> {

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
  defaults: AxiosConfig
  interceptors: {
    request: AxiosInterceptorManager<AxiosConfig>
    response: AxiosInterceptorManager<AxiosResponseConfig>
  }
  request<T = any>(config: AxiosConfig):AxiosPromise<T>
  get<T = any>(url: string, config?: AxiosConfig):AxiosPromise<T>
  head<T = any>(url: string, config?: AxiosConfig):AxiosPromise<T>
  delete<T = any>(url: string, config?: AxiosConfig):AxiosPromise<T>
  options<T = any>(url: string, config?: AxiosConfig):AxiosPromise<T>
  post<T = any>(url: string,data?: any, config?: AxiosConfig):AxiosPromise<T>
  put<T = any>(url: string,data?: any, config?: AxiosConfig):AxiosPromise<T>
  patch<T = any>(url: string,data?: any, config?: AxiosConfig):AxiosPromise<T>
}
export interface AxiosInstance extends Axios {
  <T = any>(config: AxiosConfig): AxiosPromise<T>
  <T = any>(url: string, config?: AxiosConfig): AxiosPromise<T>
}
// 定义AxiosInterceptorManager 泛型接口
export interface AxiosInterceptorManager<T> {
  use(resolved: ResolvedFn, rejected?: RejectedFn): number

  eject(id: number): void
}
// create 函数可以接受一个 AxiosRequestConfig 类型的配置，作为默认配置的扩展，也可以接受不传参数
export interface AxiosStatic extends AxiosInstance{
  create(config?: AxiosConfig): AxiosInstance
  CancelToken: CancelTokenStatic
  Cancel: CancelStatic
  isCancel: (value: any) => boolean
}
export interface ResolvedFn<T = any> {
  (val: T): T | Promise<T>
}
export interface RejectedFn {
  (error: any): any
}
export interface Transformer {
  (data: any, headers?: any) : any
}

export interface CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel
  throwIfRequested(): void
}
export interface Canceler {
  (message?: string): void
}
export interface CancelExecutor {
  (cancel:Canceler):void
}
export interface CancelTokenSource{
  token: CancelToken
  cancel: Canceler
}
export interface CancelTokenStatic {
  new (executor: CancelExecutor): CancelToken
  source(): CancelTokenSource
}

export interface Cancel {
  message?: string
}

export interface CancelStatic {
  new(message?: string): Cancel
}
export interface AxiosBasicCredentials {
  username: string
  password: string
}

