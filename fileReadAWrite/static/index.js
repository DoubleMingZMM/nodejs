const socket = io.connect()

// 监听change_from_server
socket.on('change_from_server', function(data) {

  document.getElementById('taxtarea').value = data
})

document.ready = function() {
  document.getElementById('taxtarea').onkeyup = function() {
    socket.emit('data', {msg: document.getElementById('taxtarea').value})
  }
}
