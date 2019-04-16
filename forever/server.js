const http = require('http')

http.createServer(function (req,res) {
    res.writeHead(200,{'Content-Type': 'text/plain'})
    res.end('hello forever!!!!')
}).listen(9999,"localhost")

console.log('forever守护进程已经开启')