const io = require('socket.io');
let ss = {
  client: new Map(),
  io: {},
  init: function (server) {
    this.io = io(server);
    this.io.on('connection', socket => {
      //第一次连接，发送connection信令
      socket.emit('connected');
      //客户端注册socket，统一进行管理
      socket.on('register', client => {
        client.id = socket.id ? socket.id : new Date();
        this.register(client);
      });
      socket.on('console', data => {
        this.emitClient(data.name + '_remote', 'console', data);
      });
      socket.on('run', data => {
        this.emitClient(data.name, 'run', data.code);
      });
    });
  },
  register: function (client) {
    //if (this.getClient(client.name)) return console.log('%s is Already Registed', client.name);
    this.client.set(client.name, client);
    console.log('%s Register Success', client.name);
    return true;
  },
  getClient: function (name) {
    return this.client.has(name) ? this.client.get(name).id : 0;
  },
  emitClient: function (name, type, data) {
    let id = this.getClient(name)
    if (!id) return;
    try {
      this.io.sockets.sockets[id].emit(type, data)
    } catch (error) {
      
    }
    
  }
};
module.exports = ss;