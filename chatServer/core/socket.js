const io = require('socket.io')(global.server)
const { Message } = require('@models/message')
const { addFriend } = require('@models/friendly')
const OnlineUser = {}
io.on('connection', (socket) => {
  socket.on('join', (params) => {
    socket.join(params.roomid, () => {
      OnlineUser[params.name] = socket.id
      if (params.name !== 'Vchat') {
        io.in(params.roomid).emit('joined', OnlineUser) // 包括发送者
        console.log('join', params.name, params.roomid, OnlineUser)
      }
    })
  })

  socket.on('agreeAdd', (params) => {
    addFriend(params, (res) => {
      if (res.code === 0) {
        const roomid = `${params.senderID}-${params.receiverSystemRoomID.split('-')[1]}`
        const pr = {
          status: '1',
          senderID: params.senderID
        }
        const senderParams = {
          type: 'friend',
          name: params.senderName,
          nickname: params.senderNickname,
          avatar: params.senderAvatar,
          roomid: params.roomid,
          isInChatChannels: true
        }
        const receiverParams = {
          type: 'friend',
          name: params.receiverName,
          nickname: params.receiverNickname,
          avatar: params.receiverAvatar,
          roomid: params.roomid,
          isInChatChannels: true
        }
        const message = new Message()
        message.setMessageStatus(pr)
        socket.to(roomid).emit('receiveAgreedMsg', receiverParams) // 添加好友方接收消息
        socket.emit('receiveAgreedSuccess', senderParams) // 同意添加好友方接收消息
      }
    })
  })

  socket.on('sendVerificationMessage', (params) => {
    const message = new Message()
    message.saveMessage(params)
    socket.emit('sendVerificationSuccess') // 添加方(发送验证请求方)
    socket.to(params.receiverSystemRoomID).emit('receivingVerificationMessage', params) // 接收方(一人)
  })

  socket.on('sendMsg', (params) => {
    const message = new Message()
    message.saveMessage(params)
    socket.emit('sendMsgSuccess', params)
    socket.to(params.roomid).emit('receivingMsg', params)
  })
})

module.exports = {
  io
}
