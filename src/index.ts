import Axios from './core/Axios'
import { AxiosConfig, AxiosStatic } from './types';
import { extend } from './helpers/utils';
export * from './types'
import defaults from './defaults'
import mergeConfig from './core/mergeConfig';
function createInstance(config: AxiosConfig):AxiosStatic {
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context)
  extend(instance, context)
  return instance as AxiosStatic
}
const axios = createInstance(defaults)
axios.create = function create (config){
  return createInstance(mergeConfig(defaults, config))
}
export default axios