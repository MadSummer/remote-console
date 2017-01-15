'use strict';
; (function (globle, undefined) {
  function RemoteConsole(obj) {
    this.config = obj;
    this.config.url = window.location.href;
  }
  RemoteConsole.prototype = {
    init: function () {
      if (this.isPC() && !this.config.pc) return;
      if (!this.check()) return alert('浏览器不支持console');
      try {
        this.io();
        this.override();
      } catch (error) {

      }
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
      let config = this.config
      for (let x in types) {
        let type = x.replace('_', '');
        console[type] = function () {
          let argsArr = [...arguments];
          let clone = argsArr.map((v, i) => {
            return v instanceof Object ? Object.create(v).__proto__ : v;
          })
          types[x].apply(console[type], argsArr);
          socket.emit('console', {
            type: type,
            console: clone,
            name: config.name
          });
        }
      }
      if (window.onerror) {
        olderror = window.onerror;
        window.onerror = function (msg, url, line,col,error) {
          olderror.apply(null, Array.from(arguments))
          let err = `${msg} in ${url} \n at line ${line} and col ${col} \n `
          console.error(err);
        }
      }
      else {
        window.onerror = function (msg, url, line, col, error) {
          let err = `${msg} in ${url} \n at line ${line} and col ${col} \n `
          console.error(err)
        }
      }
    },
    io: function () {
      if (!window.io) return;
      window.socket = io.connect(this.config.host)
      socket.on('run', (code) => {
        eval(code)
      });
      let config = this.config;
      socket.on('connected', () => {
        socket.emit('register', config)
      })
    },
    isPC: () => {
      let sUserAgent = navigator.userAgent.toLowerCase();
      let bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
      let bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
      let bIsMidp = sUserAgent.match(/midp/i) == "midp";
      let bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
      let bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
      let bIsAndroid = sUserAgent.match(/android/i) == "android";
      let bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
      let bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
      if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        return false;
      } else {
        return true;
      }
    }
  }
  globle.rc = {
    init: (obj) => {
      let rc = new RemoteConsole(obj);
      rc.init();
    }
  }
})(window, undefined);

