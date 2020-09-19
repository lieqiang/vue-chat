const { HttpException } = require('@core/http-exception')
const catchError = async (ctx, next) => {
  try {
      await next() // 无论下面的函数调用链有多长，都不用一个一个去处理异常，因为这里会监听
  } catch(error) {
    const isDev = true // global.config.environment === 'dev'
    const isHttpException = error instanceof HttpException
    if (isDev && !isHttpException) {
      throw error // 抛出具体异常
    }
    if (error instanceof HttpException) {
      ctx.body = {
        msg: error.msg,
        error_code: error.errorCode,
        request: `${ctx.method} ${ctx.path}`
      }
      ctx.status = error.code
    } else {
      ctx.body = {
        msg: 'we made a mistake',
        error_code: 999,
        request: `${ctx.method} ${ctx.path}`
      }
      ctx.status = 500
    }
  }
}
module.exports = catchError
