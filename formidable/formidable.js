var formidable = require('formidable')
var http = require('http')
var util = require('util')

http.createServer(function(req, res) {
  if (req.url === '/upload' && req.method.toLowerCase() === 'post') {
    var form = new formidable.IncomingForm()
    form.parse(req, function(error, fileds, files) {
      res.writeHead(200, {"Content-Type": "text/plain"})
      console.log(JSON.stringify({fileds: fileds, files: files}))
      res.end(util.inspect({fileds: fileds, files: files}))
    })
    return
  }

  res.writeHead(200, {"Content-Type": "text/html"})
  res.end("<!doctype html><html lang='en'><head><meta charset='UTF-8' http-equiv='content-type' content='text/html'></head><body><form action='/upload' method='post' enctype='multipart/form-data'><input type='text' name='title'></br><input type='file' name='upload' multiple='multiple'></br><input type='submit' value='上传'></form></body></html>")
}).listen(9999, '127.0.0.1')
