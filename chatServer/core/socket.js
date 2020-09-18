const io = require('socket.io')(global.server)
const { Message } = require('@models/message')
const { addFriend } = require('@models/friendly')
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
        const senderParams = {
          type: 'friend',
          name: params.senderName,
          nickname: params.senderNickname,
          avatar: '',
          roomid: params.roomid,
          isInChatChannels: true
        }
        const receiverParams = {
          type: 'friend',
          name: params.receiverName,
          nickname: params.receiverNickname,
          avatar: '',
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
