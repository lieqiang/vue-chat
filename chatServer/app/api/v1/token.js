const Router = require('koa-router')
const { User } = require('@models/user')
const { RegisterValidator, NotEmptyValidator } = require('@validator/validator')
const { Auth } = require('@middlewares/auth')
const { generateToken } = require('@core/util')
const router = new Router({
    prefix: '/v1/token'
})
router.post('/', async (ctx, next) => {
  // const v = await new TokenValidator().validate(ctx)
  const v = await new RegisterValidator().validate(ctx)
  const userParams = {
    username: v.get('body.username'),
    password: v.get('body.password')
  }
  console.log('userParams', userParams)
  const user = await User.getUser(userParams)
  if (!user.length) {
    throw new Success('用户名或密码错误', -1)
  }
  const token = generateToken(user._id, Auth.USER) // 返回token令牌
  ctx.body = {
    token
  }
})

router.post('/verify', async (ctx) => {
  const v = await new NotEmptyValidator().validate(ctx)
  const result = Auth.verifyToken(v.get('body.token'))
  ctx.body = {
    isValid: result
  }
})
module.exports = router
