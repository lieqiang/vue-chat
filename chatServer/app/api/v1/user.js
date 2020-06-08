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
    throw new Success('该用户名已注册', -1)
  }
  if (res.code === -1) {
    throw new Success('注册失败', -1)
  }
  throw new Success()
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
    throw new Success('用户名或密码错误', -1)
  }
  throw new Success()
})

router.get('getUserInfo', async (ctx) => {
  const username = ctx.request.query.username
  console.log('username', username)
  if (username) {
    const res = await User.getUserInfo(username)
    if (!res.length) {
      throw new Success('获取用户信息失败', -1)
    }
    ctx.body = {
      error_code: 0,
      data: {
        id: res[0]._id,
        name: res[0].name,
        photo: res[0].photo,
        bubble: res[0].bubble,
        chatTheme: res[0].chatTheme,
        projectTheme: res[0].projectTheme,
        wallpaper: res[0].wallpaper,
        nickname: res[0].nickname,
        signature: res[0].signature,
        conversationsList: res[0].conversationsList,
        code: res[0].code,
        province: res[0].province,
        city: res[0].city,
        town: res[0].town
      }
    }
  }
})

router.get('getVchatInfo', async (ctx) => {
  const res = await User.getVchatInfo()
  if (!res.length) {
    throw new Success('获取通知助手信息失败', -1)
  }
  ctx.body = {
    error_code: 0,
    data: {
      id: res[0]._id,
      name: res[0].name,
      nickname: res[0].nickname,
      signature: res[0].signature
    }
  }
})

router.get('search', async (ctx) => {
  const txt = ctx.request.query.txt
  if (txt) {
    const res = await User.search(txt)
    if (!res || !res.length) {
      ctx.body = {
        error_code: 0,
        data: []
      }
    }
    ctx.body = {
      error_code: 0,
      data: res
    }
  }
})

// router.get('addToFriendsList', async (ctx) => {
//   const res = await User.search(txt)
//   // if (!res || !res.length) {
//   //   ctx.body = []
//   // }
//   // ctx.body = res
//   // const txt = ctx.request.query.txt
//   // if (txt) {
//   //   const res = await User.search(txt)
//   //   if (!res || !res.length) {
//   //     ctx.body = []
//   //   }
//   //   ctx.body = res
//   // }
// })

module.exports = router