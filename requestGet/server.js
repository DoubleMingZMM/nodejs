var http = require('http')

http.createServer(function(req, res) {
  res.writeHead(200, {"Content-Type": "application/json"})
  res.end('Hello World boy!!\n' + req.method)
}).listen(9999, "localhost")

console.log("服务端程序已就绪。。。")