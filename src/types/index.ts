export type Method =
  | 'get'
  | 'GET'
  | 'psot'
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
export interface AxiosConfig {
  url: string
  method?: Method
  data?: any
  params?: any
}
