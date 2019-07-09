const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const path = require('path')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')
const multipart = require('connect-multiparty')
const app = express()
const compiler = webpack(WebpackConfig)
const router = express.Router()
const atob = require('atob')
require('./server2')
app.use(webpackDevMiddleware(compiler, {
  publicPath: '/__build__/',
  stats: {
    colors: true,
    chunks: false
  }
}))
app.use(express.static(__dirname, {
  setHeaders (res) {
    res.cookie('XSRF-TOKEN-D', '1234abc')
  }
}))
app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(multipart({
  uploadDir: path.resolve(__dirname, 'upload-file')
}))
router.get('/simple/get', (req, res) => {
  res.send ({
    msg: 'axios simple'
  })
})
router.get('/base/get', (req, res) => {
  res.send ({
    msg: req.query
  })
})
router.post('/base/post', (req, res) => {
  res.send ({
    msg: req.body
  })
})
router.post('/base/buffer', function(req, res) {
  let msg = []
  req.on('data', (chunk) => {
    if (chunk) {
      msg.push(chunk)
    }
  })
  req.on('end', () => {
    let buf = Buffer.concat(msg)
    res.json(buf.toJSON())
  })
})
router.get('/error/get', function (req,res) {
  if (Math.random() > 0.5) {
    res.json({
      msg: `hello world`
    })
  } else {
    res.status(500)
    res.end()
  }
})
router.get('/error/timeout', function(req, res) {
  setTimeout(() => {
    res.json({
      msg: `hello world`
    })
  }, 3000)
})
router.post('/extend/post', function (req, res) {
  res.send({
    msg: req.body
  })
})
router.get('/extend/get', function (req, res) {
  res.send({
    msg: 'get'
  })
})
router.options('/extend/options', function (req, res){
  res.send({
    msg: '/extend/options'
  })
})
router.delete('/extend/delete', function (req, res){
  res.send({
    msg: '/extend/delete'
  })
})
router.head('/extend/head', function (req, res){
  res.send({
    msg: '/extend/head'
  })
})
router.put('/extend/put', function (req, res){
  res.send({
    msg: '/extend/put'
  })
})
router.patch('/extend/patch', function (req, res){
  res.send({
    msg: '/extend/patch'
  })
})
router.get('/extend/user', function (req, res) {
  res.send({
    code: 200,
    data:{
      name: 'hbb',
      age: 25,
      message: 1
    },
    message: 'ok'
  })
})
router.get('/interceptor/get', (req, res) => {
  res.end('hello')
})
router.post('/config/post', (req, res) => {
  res.send({
    name: 'hbb'
  })
})
router.get('/cancel/get', (req, res) => {
  setTimeout(() => {
    res.send('cancel')
  }, 1000)
})
router.post('/cancel/post', (req, res) => {
  setTimeout(() => {
    res.send('cancel')
  }, 1000)
})
router.get('/more/get', (req, res) => {
  res.send({
    name: 'hbbaly'
  })
})
router.post('/more/upload', (req, res) => {
  res.send({
    name: 'progress'
  })
})
router.post('/auth/post', function(req, res) {
  const auth = req.headers.authorization
  const [type, credentials] = auth.split(' ')
  const [username, password] = atob(credentials).split(':')
  if (type === 'Basic' && username === 'Yee' && password === '123456') {
    res.json(req.body)
  } else {
    res.end('UnAuthorization')
  }
})
router.get('/more/304', function(req, res) {
  res.status(304)
  res.end()
})
router.get('/more/get', function(req, res) {
  res.send({
    name: 'hbbaly'
  })
})
app.use(router)
const port = process.env.PORT || 8080
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})