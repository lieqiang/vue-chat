require('module-alias/register')
const path = require('path')
const Koa = require('koa')
const app = new Koa()
const server = require('http').Server(app.callback())
global.server = server
require('@core/socket')
const InitManager = require('@core/init')
InitManager.initCore(app)
const static = require('koa-static')
app.use(static(path.join(__dirname, './static')))
server.listen(8090, () => {
  console.log('服务器在8090启动')
});
