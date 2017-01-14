$(function () {
  if (!window.io) return;
  let socket = io.connect('http://192.168.1.38:8888');
  let name = window.location.search.replace('?name=','') + '_remote'
  socket.on('connection', () => {
    socket.emit('register', name);
  });
  socket.on('console', (data) => {
    console.log.apply(console.log,data)
  });
  $('#run').click(function () {
    var code = $('#js').val();
    socket.emit('run', {
      name: window.location.search.replace('?name=',''),
      code: code
    })
  })
})