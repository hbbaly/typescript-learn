const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')

const app = express()
const compiler = webpack(WebpackConfig)
const router = express.Router()

app.use(webpackDevMiddleware(compiler, {
  publicPath: '/__build__/',
  stats: {
    colors: true,
    chunks: false
  }
}))

app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
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
app.use(router)
const port = process.env.PORT || 8080
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})