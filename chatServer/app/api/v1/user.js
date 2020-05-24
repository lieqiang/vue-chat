const Router = require('koa-router')
const { RegisterValidator } = require('@validator/validator')
const { User } = require('@models/user')
const { Success } = require('@core/http-exception')
const router = new Router({
  prefix: '/v1/user/'
})

router.post('signup', async (ctx) => {
  const v = await new RegisterValidator().validate(ctx)
  const user = {
    username: v.get('body.username'),
    password: v.get('body.password')
  }
  console.log('userParams', user)
  const res= await User.signup(user)
  console.log('res', res)
  if (res.code === 1) {
    throw new Success('该用户名已注册')
  }
  if (res.code === -1) {
    throw new Success('注册失败')
  }
})

router.post('signin', async (ctx) => {
  const v = await new RegisterValidator().validate(ctx)
  const user = {
    username: v.get('body.username'),
    password: v.get('body.password')
  }
  console.log('userParams', user)
  const res = await User.signin(user)
  if (!res.length) {
    throw new Success('用户名或密码错误', 0)
  }
  throw new Success()
})

router.get('getUserInfo', async (ctx) => {
  const username = ctx.request.query.username
  if (username) {
    const res = await User.getUserInfo(username)
    if (!res.length) {
      throw new Success('获取用户信息失败', 0)
    }
    ctx.body = res[0]
  }
})

router.get('search', async (ctx) => {
  const txt = ctx.request.query.txt
  if (txt) {
    const res = await User.search(txt)
    if (!res.length) {
      ctx.body = []
    }
    ctx.body = res
  }
})

module.exports = router