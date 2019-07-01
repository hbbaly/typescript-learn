import Axios from './core/Axios'
import { AxiosInstance, AxiosConfig } from './types';
import { extend } from './helpers/utils';
export * from './types'
import defaults from './defaults'
function createInstance(config: AxiosConfig):AxiosInstance {
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context)
  extend(instance, context)
  return instance as AxiosInstance
}
const axios = createInstance(defaults)
export default axios