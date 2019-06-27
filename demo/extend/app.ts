import axios from '../../src/index'
axios({
  url: '/extend/post',
  method: 'post',
  data: {
    name: 'hbb'
  }
})
axios('/extend/post',{
  method: 'post',
  data: {
    name: 'hbbaly'
  }
})
axios.request({
  url: '/extend/post',
  method: 'post',
  data: {
    name: 'hbbaly1314520'
  }
})
axios.get('/extend/get')
axios.delete('/extend/delete')
axios.options('/extend/options')
axios.head('/extend/head')
axios.post('/extend/post', {name: 'hbbaly1314'})
axios.put('/extend/put', { msg: 'put' })
axios.patch('/extend/patch', { msg: 'patch' })