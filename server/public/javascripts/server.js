$(function () {
  if (!window.io) return;
  let socket = io.connect('http://192.168.123.76:8888');
  let name = window.location.search.replace('?name=','') + '_remote'
  socket.on('connected', () => {
    socket.emit('register', {name:name});
  });
  socket.on('console', (data) => {
    console[data.type].apply(null,data.console)
  });
  $('#run').click(function () {
    var code = $('#js').val();
    socket.emit('run', {
      name: window.location.search.replace('?name=',''),
      code: code
    })
  })
})