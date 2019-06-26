import { AxiosConfig } from './types/index'
export default function xhr(config: AxiosConfig): void {
  // todo
  const { url, data = null, method = 'get',headers = {} } = config
  const request = new XMLHttpRequest()
  request.open(method.toUpperCase(), url, true)
  Object.keys(headers).forEach(val => {
    if (data === null && val.toLowerCase() === 'content-type') {
      delete headers[val]
    } else {
      request.setRequestHeader(val, headers[val])
    }
  })
  request.send(data)
}
