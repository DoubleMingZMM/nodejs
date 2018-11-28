var http = require('http')
var querystring = require('querystring')

http.createServer(function(req, res) {
  var postData = ''
  req.addListener('data', function(postDataChunk) {
    postData = postData + postDataChunk
  })
  req.addListener('end', function() {
    var postStr = JSON.stringify(querystring.parse(postData))
    res.writeHead(200, {"Content-Type": "text/plain"})
    res.end(postStr + '\n' + req.method)
  })
}).listen(9999, 'localhost')
