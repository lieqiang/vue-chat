const io = require('socket.io')(global.server)
const { User } = require('@models/user')
const { Message } = require('@models/message')
const { addFriend } = require('@models/friendly')
const { params } = require('../app/api/v1/user')
const OnlineUser = {}
io.on('connection', (socket) => {
  socket.on('join', (params) => {
    socket.join(params.roomid, () => {
      console.log(params.name, '加入了roomid', params.roomid)
      OnlineUser[params.name] = socket.id
      io.in(params.roomid).emit('joined', OnlineUser) // 包括发送者
      console.log(params.name, 'join', params.roomid, OnlineUser)
    })
  })

  socket.on('agreeAdd', (params) => {
    console.log('agreeAdd params', params)
    addFriend(params, (res) => {
      if (res.code === 0) {
        const roomid = `${params.senderID}-${params.receiverSystemRoomID.split('-')[1]}`
        const pr = {
          status: '1',
          senderID: params.senderID
        }
        const senderParams = { // 加nickname
          name: params.senderName,
          nickname: params.senderNickname,
          photo: '',
          roomid: params.roomid,
          type: 'friend'
        }
        const receiverParams = {
          name: params.receiverName,
          nickname: params.receiverNickname,
          photo: '',
          roomid: params.roomid,
          type: 'friend'
        }
        User.addToConversitionList(senderParams.name, receiverParams)
        User.addToConversitionList(receiverParams.name, senderParams)
        console.log('senderParams', senderParams)
        console.log('receiverParams', receiverParams)
        const message = new Message()
        message.setMessageStatus(pr) // 设置消息状态 为 已通过
        socket.to(roomid).emit('receiveAgreedMsg', receiverParams) // 添加好友方接收消息
        socket.emit('receiveAgreedSuccess', senderParams) // 同意添加好友方接收消息 .in(params.receiverSystemRoomID)
      }
    })
  })

  socket.on('sendVerificationMessage', (params) => {
    console.log('sendVerificationMessage')
    const message = new Message()
    message.saveMessage(params)
    socket.emit('sendVerificationSuccess') // 添加方(发送验证请求方) .in(roomid)
    socket.to(params.receiverSystemRoomID).emit('receivingVerificationMessage', params) // 接收方(一人)
  })

  socket.on('sendMsg', (params) => {
    const message = new Message()
    message.saveMessage(params)
    socket.emit('sendMsgSuccess', params)
    console.log('params.roomid', params.roomid)
    socket.to(params.roomid).emit('receivingMsg', params)
  })
})

module.exports = {
  io
}
