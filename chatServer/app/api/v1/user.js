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
    username: v.get('body.username'), // body
    password: v.get('body.password')
  }
  console.log('userParams', user)
  const r = await User.signup(user)
  console.log('res', r)
  ctx.body = r
})

router.post('signin', async (ctx) => {
  const v = await new RegisterValidator().validate(ctx)
  const user = {
    username: v.get('body.username'), // body
    password: v.get('body.password')
  }
  console.log('userParams', user)
  const r = await User.signin(user)
  console.log('res', r)
  ctx.body = r
})

// router.get('test', async (ctx) => {
//   ctx.body = {
//     test: 1,
//     success: true
//   }
//   // throw new Success()
// })
module.exports = router