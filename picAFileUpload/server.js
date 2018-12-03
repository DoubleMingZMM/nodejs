const http = require('http')
const url = require('url')
const fs = require('fs')
const util = require('util')
const formidable = require('formidable')

const staticModule = require('./static_module')

function goIndex(response) {
  response.writeHead(200, {
    "Content-Type": "text/html;charset=UTF-8"
  });
  const realpath = __dirname + '/' + 'index.html'
  const indexpage = fs.readFileSync(realpath)
  response.end(indexpage)
}

function uploadPic(request, response) {
  const readpath = __dirname + '/show_image.html'
  const indexpage = fs.readFileSync(readpath)
  const form = new formidable.IncomingForm()
  form.parse(request, function(error, fileds, files) {
    if (error) {
      throw error
    } else {
      response.writeHead(200, {"Content-Type": "text/html"})
      response.end(indexpage)
    }
  })
}

const server = http.createServer(function(request, response) {

  const pathname = url.parse(request.url).pathname
  if (pathname === 'favicon.ico') {
    return false
  } else if (pathname === '/') {
    goIndex(response)
  }else if (pathname === '/upload') {
    uploadPic(request, response)
  } else {
    staticModule.getStaticFile(pathname, response, request)
  }
})

server.listen(1234, 'localhost')
