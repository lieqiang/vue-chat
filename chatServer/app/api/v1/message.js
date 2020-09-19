const Router = require('koa-router')
const { Message } = require('@models/message')
const { MsgHadReadValidator } = require('@validator/validator')
const router = new Router({
  prefix: '/v1/message/'
})

router.get('getNewFriendsMsg', async (ctx) => {
  const roomid = ctx.request.query.roomid
  const message = new Message()
  const res = await message.getSystemMessages(roomid)
  let data = []
  for (let i = 0; i < res.length; i++) {
    const msgItem = JSON.parse(JSON.stringify(res[i]))
    delete res[i].senderID
    const systemMsg = {
      name: msgItem.senderID.name,
      senderID: msgItem.senderID._id,
      nickname: msgItem.senderID.name,
      senderAvatar: msgItem.senderID.avatar,
      signature: msgItem.senderID.signature
    }
    data.push(Object.assign(res[i], systemMsg))
  }
  ctx.body = {
    error_code: 0,
    data: data
  }
})

router.get('getHistoryMsg', async (ctx) => {
  const roomid = ctx.request.query.roomid
  const message = new Message()
  const res = await message.getHistoryMsg(roomid)
  ctx.body = {
    error_code: 0,
    data: res
  }
})

router.post('setMsgHadRead', async (ctx) => {
  const v = await new MsgHadReadValidator().validate(ctx)
  const params = {
    name: v.get('body.name'),
    roomid: v.get('body.roomid')
  }
  const message = new Message()
  const res = await message.setMsgHadRead(params)
  if (typeof(res) === 'object') {
    ctx.body = {
      error_code: 0,
      data: res
    }
  } else {
    ctx.body = {
      error_code: -1,
      msg: '设置消息为已读失败'
    }
  }
})

module.exports = router
