const Router = require('koa-router')
const { Message } = require('@models/message')
// const { Success } = require('@core/http-exception')
const router = new Router({
  prefix: '/v1/message/'
})

router.get('getNewFriendsMsg', async (ctx) => {
  const roomID = ctx.request.query.roomID
  console.log('roomId', roomID)
  const message = new Message()
  const res = await message.getSystemMessages(roomID)
  // if (!res.length) {
  //   throw new Success('获取系统消息失败', -1)
  // }
  ctx.body = {
    error_code: 0,
    data: res
  }
})

module.exports = router
