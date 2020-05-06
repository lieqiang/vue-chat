const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
  // console.log('connection !!')
  socket.emit('test', 'dddfdd')
  socket.on('otherevent', (data) => {
    console.log(data)
  })
})

server.listen(8090, () => {
  console.log('服务器在8090启动')
});