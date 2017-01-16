;
(function () {
  if (!window.io) return;
  let socket = io.connect('http://192.168.1.38:8888');

  function querystring(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }
  socket.on('connected', () => {
    socket.emit('register', {
      name: querystring('name') + '_remote',
      url:querystring('url')
    });
  });
  socket.on('console', (data) => {
    console[data.type].apply(null, data.console);
  });
  let btn = document.querySelector('#run');
  btn.addEventListener('click', () => {
    let code = document.querySelector('#code').value;
    socket.emit('run', {
      name: querystring('name'),
      code: code
    })
  })
})()