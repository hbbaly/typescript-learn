import { AxiosConfig, AxiosResponseConfig, AxiosPromise } from './types/index'
import {parseResponseHeaders} from './helpers/headers'
import { createError} from './helpers/error'
import { isSameOrigin } from './helpers/url';
import cookie from './helpers/cookies';
import { isFormData } from './helpers/utils';
export default function xhr(config: AxiosConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { url, data = null, method = 'get',headers = {}, responseType, timeout, cancelToken, withCredentials,xsrfCookieName, xsrfHeaderName,onDownLoadProcess,onUploadProgress, auth} = config
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
    // 请求的数据是 FormData 类型，我们应该主动删除请求 headers 中的 Content-Type 字段，让浏览器自动根据请求数据设置 Content-Type
    if (isFormData(data)) {
      delete headers['Content-Type']
    }
    if (withCredentials) request.withCredentials = true
    if ((withCredentials || isSameOrigin(url!)) && xsrfCookieName) {
      const xsrfValue = cookie.read(xsrfCookieName)
      if (xsrfValue && xsrfHeaderName) {
        headers[xsrfHeaderName] = xsrfValue
      }
    }
    if (onDownLoadProcess) {
      request.onprogress = onDownLoadProcess
    }
    if (onUploadProgress) request.upload.onprogress = onUploadProgress
    if (auth) headers['Authorization'] = 'Basic ' + btoa(auth.username + ':' + auth.password)
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
