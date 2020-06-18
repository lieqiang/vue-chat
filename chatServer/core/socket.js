const io = require('socket.io')(global.server) // server
const { User } = require('@models/user')
const { Message } = require('@models/message')

const OnlineUser = {}
io.on('connection', (socket) => {
  socket.on('join', (params) => {
    socket.join(params.roomID, () => {
      console.log('加入房间', params.name)
      OnlineUser[params.name] = socket.id // socket.id ???
      io.in(params.roomID).emit('joined', OnlineUser) // 包括发送者
      console.log('join', params.roomID, OnlineUser)
    })
  })

  socket.on('agreeAdd', (params) => {
    let pr = {
      status: '1',
      userM: params['userM'] // userM: this.user.id
    };
    apiList.setMessageStatus(pr) // 设置消息状态 为 已通过
    // 通知申请人验证已同意
    let value = {
      name: '',
      mes: `${params.friendName}同意了你的好友请求！`,
      time: utils.formatTime(new Date()),
      // avatar: params.userYphoto,
      nickname: params.friendName,
      read: [],
      state: 'friend',
      type: 'info',
      status: '1',
      roomID: `${params.userID}-${params.vchatID}` // userID 发送请求添加好友的p朋友id
    }
    // apiList.saveMessage(value)
    let userParams = {
      name: params.nickname,
      // photo: params.avatar,
      roomID: params.selfAndfriendRoomID,
      type: 'friend'
    }
    let friendParams = {
      name: params.friendName,
      // photo: params.userYphoto,
      roomID: params.selfAndfriendRoomID,
      type: 'friend'
    }
    User.addToConversitionList(params.name, friendParams)
    User.addToConversitionList(params.friendName, userParams)
    socket.to(value.roomID).emit('takeValidate', value)
    // socket.emit('ValidateSuccess', 'ok')
  })

  socket.on('sendVerificationMessage', (params) => {
    console.log('sendVerificationMessage')
    const message = new Message()
    message.saveMessage(params)
    console.log('aaa', params.friendAndVchatRoomID)
    socket.to(params.friendAndVchatRoomID).emit('receivingVerificationMessage', params) // 所有房间的客户将收到消息，包括连接到socket的人
  })
})

module.exports = {
  io
}
