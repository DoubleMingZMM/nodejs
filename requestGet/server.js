var http = require('http')

http.createServer(function(req, res) {
  res.writeHead(200, {"Content-Type": "text/plain"})
  res.end('Hello World\n' + req.method)
}).listen(9999, "localhost")
