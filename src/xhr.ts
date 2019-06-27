import { AxiosConfig, AxiosResponseConfig, AxiosPromise } from './types/index'
import {parseResponseHeaders} from './helpers/headers'
export default function xhr(config: AxiosConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { url, data = null, method = 'get',headers = {}, responseType, timeout } = config
    const request = new XMLHttpRequest()

    if (responseType) request.responseType = responseType
    request.open(method.toUpperCase(), url, true)
    request.onerror = function handleError() {
      reject(new Error('Network Error'))
    }
    if (timeout) request.timeout = timeout
    request.ontimeout = function handleTimeout () {
      reject(new Error(`Timeout of ${timeout} ms exceeded`))
    }
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
      response.status >= 200 && response.status <300? resolve(response) : reject(new Error(`Request failed with status code ${response.status}`))
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
