const Router = require('koa-router')
const { Message } = require('@models/message')
// const { Success } = require('@core/http-exception')
const router = new Router({
  prefix: '/v1/message/'
})

router.get('getNewFriendsMsg', async (ctx) => {
  const roomid = ctx.request.query.roomid
  console.log('roomId', roomid)
  const message = new Message()
  const res = await message.getSystemMessages(roomid)
  ctx.body = {
    error_code: 0,
    data: res
  }
})

router.get('getHistoryMsg', async (ctx) => {
  const roomid = ctx.request.query.roomid
  console.log('roomId', roomid)
  const message = new Message()
  const res = await message.getHistoryMsg(roomid)
  // if (!res.length) {
  //   throw new Success('获取历史消息失败', -1)
  // }
  ctx.body = {
    error_code: 0,
    data: res
  }
})

module.exports = router
