const io = require('socket.io')(global.server) // server
io.on('connection', (socket) => {
  socket.on('otherevent', (data) => {
    console.log('event', data)
    socket.emit('test', { a: 'from server' })
  })
})

module.exports = {
  io
}
