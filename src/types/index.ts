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
export interface ResolvedFn<T = any> {
  (val: T): T | Promise<T>
}
export interface RejectedFn {
  (error: any): any
}
