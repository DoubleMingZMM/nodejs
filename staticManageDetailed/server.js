// 引入http标准模块,CommonJS模块
const http = require("http");
const fs = require("fs");
const url = require("url");

const staticModule = require('./static_module')

function goIndex(response) {
  response.writeHead(200, {
    "Content-Type": "text/html;charset=UTF-8"
  });
  var readpath = __dirname + '/' + url.parse('index.html').pathname

  var pathname = fs.readFileSync(readpath)
  response.end(pathname)
}

// 创建一个web服务器
const server = http.createServer(function(request, response) {
  var pathname = url.parse(request.url).pathname
  if (pathname === './favicon.ico') {
    return false
  } else if (pathname === '/') {
    goIndex(response)
  } else {
    staticModule.getStaticFile(pathname, response, request)
  }
});

// 服务器监听端口
server.listen(22233, "localhost");
