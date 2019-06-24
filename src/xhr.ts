import { AxiosConfig } from './types/index'
export default function xhr(config: AxiosConfig): void {
  // todo
  const { url, data = null, method = 'get' } = config
  const request = new XMLHttpRequest()
  request.open(method.toUpperCase(), url, true)
  request.send(data)
}
