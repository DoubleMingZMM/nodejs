var http = require('http')
var dns = require('dns')
var fs = require('fs')
var url = require('url')
var querystring = require('querystring')

function getDns(postData,callback) {

  var domain = querystring.parse(postData).dns_search
  dns.resolve(domain, function(err, addresses) {
    if (!addresses) {
      addresses = ["域名不存在"]
    }
    callback(domain,addresses)
  })
}

function goIndex(res,req) {
  var readpath = __dirname + '/' + url.parse('index.html').pathname
  var pathname = fs.readFileSync(readpath)
  res.end(pathname)
}

function parseDns(res,req) {
  var postData = ""
  req.addListener("data", function(postDataChunk) {
    postData = postData + postDataChunk
  })
  req.addListener("end", function() {
    getDns(postData, function(domain, addresses) {
      res.writeHead(200, {"Content-Type": "text/html"})
      res.end("<!doctype html><html lang='en'><head><meta charset='UTF-8' http-equiv='content-type' content='text/html'></head><body><div style='text-align: center'><h3>Domain: <span style='color: red'>" + domain + "</span></h3><h3>IP: <span style='color: red'>" + addresses.join(',') + "</span></h3></div></body></html>")
    })
    return
  })
}

function router(res,req,pathname) {
  switch(pathname) {
    case '/parse':
      parseDns(res,req)
    break
    default:
      goIndex(res,req)
  }
}

http.createServer(function(req,res) {
  var pathname = url.parse(req.url).pathname
  req.setEncoding("utf8")
  res.writeHead(200, {"Content-Type": "text/html"})
  router(res,req,pathname)
}).listen(9999, "127.0.0.1")
