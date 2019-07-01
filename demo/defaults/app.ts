import qs from 'qs'
import axios , { Transformer } from '../../src'
// axios.defaults.headers.common['test'] = '123'
// axios({
//   url: '/config/post',
//   method: 'post',
//   data: qs.stringify({
//     a: 1
//   }),
//   headers: {
//     test: '321'
//   }
// }).then((res) => {
//   console.log(res.data)
// })
axios({
  transformRequest: [(function(data) {
    return qs.stringify(data)
  }), ...(axios.defaults.transformRequest as Transformer[])],
  transformResponse: [...(axios.defaults.transformResponse as Transformer[]), function(data) {
    console.log(data, 'data')
    if (typeof data === 'object') {
      data.age = 25
    }
    return data
  }],
  url: '/config/post',
  method: 'post',
  data: {
    a: 1
  }
}).then((res) => {
  console.log(res.data)
})