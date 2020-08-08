require('module-alias/register')
const path = require('path')
const Koa = require('koa')
const app = new Koa()
const server = require('http').Server(app.callback())
global.server = server
require('@core/socket')
const parser = require('koa-bodyparser') // 获取body参数
const InitManager = require('@core/init')
const catchError = require('@middlewares/exception')
const { User } = require('@models/user')
User.initHelper()
app.use(catchError)
app.use(parser())
const static = require('koa-static')
app.use(static(path.join(__dirname, './static')))
app.use(static(path.join(__dirname, './public')))
InitManager.initCore(app)
var cors = require('koa2-cors')
app.use(cors())
server.listen(8090, () => {
  console.log('服务器在8090启动')
})

