import { AxiosConfig, AxiosResponseConfig, AxiosPromise } from './types/index'
import {parseResponseHeaders} from './helpers/headers'
import { createError} from './helpers/error'
export default function xhr(config: AxiosConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { url, data = null, method = 'get',headers = {}, responseType, timeout, cancelToken, withCredentials } = config
    const request = new XMLHttpRequest()

    if (responseType) request.responseType = responseType
    request.open(method.toUpperCase(), url!, true)
    request.onerror = function handleError() {
      reject(createError(
        'Network Error',
        config,
        null,
        request
      ))
    }
    if (timeout) request.timeout = timeout
    request.ontimeout = function handleTimeout () {
      reject(createError(
        `Timeout of ${config.timeout} ms exceeded`,
        config,
        'ECONNABORTED',
        request
      ))
    }
    if (cancelToken) {
      cancelToken.promise.then(reason => {
        request.abort()
        reject(reason)
      })
    }
    if (withCredentials) request.withCredentials = true
    request.onreadystatechange = function handle () {
      if (request.readyState !== 4 || request.status === 0) return
      const requestHeaders = parseResponseHeaders(request.getAllResponseHeaders())
      const responseData = responseType && responseType === 'text' ? request.responseText : request.response

      const response: AxiosResponseConfig = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        config,
        headers: requestHeaders,
        request
      }
      handleResponse(response)
    }
    function handleResponse (response: AxiosResponseConfig) {
      response.status >= 200 && response.status <300? resolve(response) : reject(createError(`Request failed with status code ${response.status}`,
      config,
      null,
      request,
      response))
    }
    Object.keys(headers).forEach(val => {
      if (data === null && val.toLowerCase() === 'content-type') {
        delete headers[val]
      } else {
        request.setRequestHeader(val, headers[val])
      }
    })
    request.send(data)
  })
}
