import { AxiosConfig, AxiosResponseConfig } from '../types/index'
export class AxiosError extends Error{
  isAxiosError: boolean
  config: AxiosConfig
  code?: string | null
  request?: any
  response?: AxiosResponseConfig
  constructor (
    message: string,
    config: AxiosConfig,
    code?: string | null,
    request?: any,
    response?: AxiosResponseConfig
  ) {
    super(message)
    this.isAxiosError = true
    this.config = config
    this.code = code
    this.request = request
    this.response = response
    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}
export function createError (
  message: string,
  config: AxiosConfig,
  code?: string | null,
  request?: any,
  response?: AxiosResponseConfig
): AxiosError {
  const error = new AxiosError(message,config, code, request, response)
  return error
}