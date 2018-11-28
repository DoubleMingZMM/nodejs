// 引入http标准模块,CommonJS模块
const http = require("http");
const fs = require("fs");
const url = require("url");

function dealWithStatic(pathname, realpath, response) {
  fs.exists(realpath, function(exists) {
    if (!exists) {
      response.writeHead(404, {
        "Content-Type": "text/plain;charset=UTF-8"
      });
      response.write("is not found")
      response.end();
    } else {
      var mineType = ''
      var pointPosition = pathname.lastIndexOf('.')
      var mineString = pathname.substring(pointPosition + 1)
      switch(mineString) {
        case 'css':
          mineType = 'text/css'
        break
        case 'png':
          mineType = 'text/png'
          break
        default:
          mineType = 'text/plain'
          break
      }
      fs.readFile(realpath, "binary", function(err, file) {
        if (err) {
          response.writeHead(500, {
            "Content-Type": "text/plain;charset=UTF-8"
          });
          response.end(err)
        } else {
          response.writeHead(200, {
            "Content-Type": mineType + ";charset=UTF-8"
          });
          response.write(file, 'binary')
          response.end()
        }
      })
    }
  })
}

function goIndex(response, request) {
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

  var realpath = __dirname + pathname

  if (pathname === './favicon.ico') {
    return false
  } else if (pathname === '/') {
    goIndex(response, request)
  } else {
    dealWithStatic(pathname, realpath, response)
  }
});

// 服务器监听端口
server.listen(9999, "localhost");
