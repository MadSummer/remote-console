const app = require('../app');
const server = require('http').Server(app);
const io = require('socket.io')(server);
io.on('connection', (socket) => {
  socket.emit('run', {
    msg: 'alert(1)'
  });
  socket.on('my other event', function (data) {
    console.log(data);
  });
})