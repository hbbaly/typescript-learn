import qs from 'qs'
import axios from '../../src'
axios.defaults.headers.common['test'] = '123'
axios({
  url: '/config/post',
  method: 'post',
  data: qs.stringify({
    a: 1
  }),
  headers: {
    test: '321'
  }
}).then((res) => {
  console.log(res.data)
})