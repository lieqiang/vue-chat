const io = require('socket.io')(global.server) // server
const { Message } = require('@models/message')
io.on('connection', (socket) => {
  socket.on('otherevent', (data) => {
    console.log('event', data)
    socket.emit('test', { a: 'from server' })
  })

  socket.on('sendVerificationMessage', (params) => {
    console.log('sendVerificationMessage')
    const message = new Message()
    message.saveMessage(params)
    socket.to(params.roomid).emit('receivingMessages', params)
  })
})

module.exports = {
  io
}
