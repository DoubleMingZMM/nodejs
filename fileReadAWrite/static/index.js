const socket = io.connect('http://127.0.0.1:22233')

// 监听change_from_server
socket.on('from_server', function(data) {
  document.getElementById('textarea').value = data.msg
})

window.onload = function() {
  document.getElementById('textarea').onkeyup = function() {
    socket.emit('update', {msg: document.getElementById('textarea').value})
  }
}
