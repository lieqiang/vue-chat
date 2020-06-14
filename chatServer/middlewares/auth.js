const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')
const config = require('@config/config')
const { Forbbiden } = require('@core/http-exception')

class Auth {
  constructor(level) {
    this.level = level
    Auth.USER = 8
    Auth.ADMIN = 16
    Auth.SUPER_ADMIN = 32
  }
  get m() {
    return async (ctx, next) => {
      const userToken = basicAuth(ctx.req)
      let errMsg = 'token不合法'

      if (!userToken || !userToken.name) {
        throw new Forbbiden(errMsg)
      }
      try {
        var decode = jwt.verify(userToken.name, 
          config.security.secretKey)
      } catch (error) {
        if (error.name == 'TokenExpiredError'){
          errMsg = 'token已过期'
        }
        throw new Forbbiden(errMsg)
      }

      if(decode.scope < this.level){
        errMsg = '权限不足'
        throw new Forbbiden(errMsg)
      }
      ctx.auth = {
        uid:decode.uid,
        scope:decode.scope
      }
      await next()
    }
  }

  static verifyToken(token) {
    try {
      jwt.verify(token, config.security.secretKey)
      return true
    } catch (error) {
      return false
    }
  }
}

module.exports = {
  Auth
}
