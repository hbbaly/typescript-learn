import { AxiosConfig } from "./types";

const defaults: AxiosConfig = {
  method: 'get',
  timeout: 0,
  headers: {
    common:{
      Accept: 'application/json, text/plain, */*'
    }
  }
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