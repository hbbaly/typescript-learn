import { Tracing } from "trace_events";

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
  url: string
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
