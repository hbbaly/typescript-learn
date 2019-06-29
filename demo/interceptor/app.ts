import axios from '../../src/index'
// interceptors.request 是先进后出
axios.interceptors.request.use(config => {
  config.headers.test += '1'
  return config
})
axios.interceptors.request.use(config => {
  config.headers.test += '2'
  return config
}) 
let interceptor1 =axios.interceptors.request.use(config => {
  config.headers.test += '3'
  return config
})

// interceptors.response 是先进先出
axios.interceptors.response.use(res => {
  res.data += '1'
  return res
})
let interceptor = axios.interceptors.response.use(res => {
  res.data += '2'
  return res
})
axios.interceptors.response.use(res => {
  res.data += '3'
  return res
})
axios.interceptors.request.eject(interceptor1) // 删除request 第三个
axios.interceptors.response.eject(interceptor) // 删除response第二个

axios({
  url: '/interceptor/get',
  method: 'get',
  headers: {
    test: ''
  }
}).then((res) => {
  console.log(res, 'res.data')
   // 'hello13 2被删除了
})