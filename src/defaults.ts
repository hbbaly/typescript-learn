import { AxiosConfig } from "./types";
import { transformRequest, transformResponse } from "./helpers/data";
import { processHeaders } from "./helpers/headers";

const defaults: AxiosConfig = {
  method: 'get',
  timeout: 0,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  headers: {
    common:{
      Accept: 'application/json, text/plain, */*'
    }
  },
  // transformRequest 和 transformResponse 两个字段，它们的值是一个数组或者是一个函数。
  // 当值为数组的时候，数组的每一个函数都是一个转换函数，数组中的函数就像管道一样依次执行，前者的输出作为后者的输入。
  transformRequest: [
    function (data: any, headers: any): any{
      processHeaders(headers, data)
      return transformRequest(data)
    }
  ],
  transformResponse: [
    function (data: any): any{
      return transformResponse(data)
    }
  ]
}
const methodWithData = ['post', 'put', 'patch']
methodWithData.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})
const methodWithNoData = ['delete', 'get', 'head', 'options']
methodWithNoData.forEach(method => {
  defaults.headers[method] = {}
})
export default defaults