const http = require('http')
const fs = require('fs')
const url = require('url')

http.createServer(function (req,res) {
    res.writeHead(200,{"Content-Type": 'text/html'})
    const filepath = __dirname + '/' + url.parse('index.html').pathname
    const index = fs.readFileSync(filepath)
    res.end(index)
}).listen(9999,'localhost')

console.log('解析HTML已经启动服务')