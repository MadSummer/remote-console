'use strict';
; (function (globle, undefined) {
  function RemoteConsole(obj) {
    this.config = obj;
  }
  RemoteConsole.prototype = {
    init: function () {
      if (!this.check()) return;
      if (this.config.upload) {
        this.io();
      }
      this.override();
    },
    check: function () {
      try {
        console.log('😀😀😀😀');
        return true;
      } catch (error) {
        return false;
      }
    },
    override: function () {
      let types = {
        _log: console.log,
        _info: console.info,
        _warn: console.warn,
        _error: console.error
      }
      for (let x in types) {
        let type = x.replace('_', '');
        console[type] = function () {
          let args = arguments;
          if (args.length == 1) {
            types[x](args[0])
          }
          else {
            let flag = [...args].every((t, i) => typeof t === 'string');
            if (flag) {
              types[x]([...args].toString());
            }
            else {
              types[x]([...args]);
            }
          }
          
        }
      }
    },
    io: function () {
      if (!window.io) return;
      window.socket = io.connect(this.config.host)
      socket.on('run', (data) => {
        try {
          eval(data);
        } catch (error) {
          console.log(error)
        }
      });
      socket.emit('conn', this.config.ext)
    }
  }
  globle.rc = {
    init: (obj) => {
      let rc = new RemoteConsole(obj);
      rc.init();
    }
  }
})(window, undefined);

