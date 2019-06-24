import { AxiosConfig } from './types/index'
import xhr from './xhr'
export default function axios(config: AxiosConfig): void {
  // todo
  xhr(config)
}
