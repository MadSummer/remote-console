const io = require('socket.io');
let ss = {
  client: new Map(),
  io: {},
  init: function (server) {
    this.io = io(server);
    this.io.on('connection', socket => {
      socket.emit('connection');
      socket.on('register', name => {
        this.register(name, socket.id);
      });
      socket.on('console', data => {
        this.console(data.msg, data.name);
      });
      socket.on('run', data => {
        this.run(data.name, data.code);
      });
    });
  },
  register: function (name, id) {
    if (this.client.has(name)) return;
    this.client.set(name, id);
    console.log('%s注册成功', name)
  },
  run: function (name, code) {
    if (!this.client.has(name)) return;
    this.io.sockets.sockets[this.client.get(name)].emit('run', {
      msg: code
    })
  },
  console: function (msg, name) {
    switch (msg.type) {
      case 'log':

        break;

      default:
        break;
    }
    if (!this.client.has(name + '_remote')) return;
    this.io.sockets.sockets[this.client.get(name + '_remote')].emit('console', msg)
  }
};
module.exports = ss;