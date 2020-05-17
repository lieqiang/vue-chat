const requireDirectory = require('require-directory')
const Router = require('koa-router')
class InitManager {
    static initCore(app) {
      console.log('adddd')
      InitManager.app = app
      InitManager.initLoadRouters()
      // InitManager.loadConfig()
    }
    static initLoadRouters() {
      const apiDirectory = `${process.cwd()}/app/api`
      requireDirectory(module, apiDirectory, { // 为了简化app.js 代码，不要把多的方法写在app.js里面；
        visit: whenLoadModule
      } )
      function whenLoadModule(obj) {
        if (obj instanceof Router) {
          InitManager.app.use(obj.routes())
        }
      }
    }
    // static loadConfig(path = '') {
    //   const configPath = path || process.cwd() + '/config/config.js'
    //   const config = require(configPath)
    //   global.config = config
    // }
}
module.exports = InitManager