// 引入http标准模块,CommonJS模块
const http = require("http");
const fs = require("fs");
const url = require("url");
const socket = require("socket.io")
const querystring = require("querystring")
const jade = require("jade")

const staticModule = require('./static_module')
// const httpParam = require('./http_param')

const filepath = __dirname + '/static/zmm.txt'

function goIndex(response) {
  response.render('index.jade')
}

// 创建一个web服务器
const server = http.createServer(function(request, response) {
  response.render = function(template, options) {
    const str = fs.readFileSync(template, 'utf-8')
    const fn = jade.compile(str, {filename: template, pretty: true})
    const page = fn(options)
    response.writeHead(200, {"Content-Type": "text/html"})
    response.end(page)
  }

  // 初始化httpParam模块
  // httpParam.init(request, response)

  const pathname = decodeURI(url.parse(request.url).pathname)
  if (pathname === './favicon.ico') {
    return false
  }

  switch(pathname) {
    case '/':
      goIndex(response)
    break
    case '/index':
      goIndex(response)
    break
    default:
      staticModule.getStaticFile(pathname, response, request)
    break
  }
}).listen(22233, "127.0.0.1")

// 创建socket服务器
const io = socket.listen(server)

io.sockets.on('connection', function(socket) {
  const message = fs.readFileSync(filepath, 'utf8')

  socket.emit('from_server', {msg: message})

  socket.on('update', function(data) {
    fs.writeFile(__dirname + '/static/zmm.txt', data.msg, function() {
      socket.emit('from_server', {msg: data.msg})
    })
  })
})


