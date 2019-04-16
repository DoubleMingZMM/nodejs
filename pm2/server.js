const http = require('http')

http.createServer(function (req,res) {
    res.writeHead(200,{'Content-Type': 'text/plain'})
    res.end('hello boy!!!')
}).listen(9999,"localhost")

console.log('pm2守护进程已经开启')