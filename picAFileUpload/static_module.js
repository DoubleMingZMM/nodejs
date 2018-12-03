/*static_module.js*/
var fs = require('fs');
var http = require('http');
var url = require('url');
var path = require('path');


var BASE_DIR = __dirname;
var STATIC = BASE_DIR  ;
var CACHE_TIME = 30;

const {lookup} = require('./conf/mime_type')

exports.getStaticFile = function(pathname, response, request){
  const mimeType = lookup(pathname)
  const realpath = STATIC + pathname
  console.log("realpath==============================>", realpath)
  fs.exists(realpath, function (exist) {
    if (!exist) {
      console.log("11111111==============================>")
      response.writeHead(404, {"Conten-Type": "text/plain"})
      response.write("sorry not found this source!")
      response.end()
    } else {
      console.log("22222222==============================>")
      /*const fileInfo = fs.statSync(realpath)
      const lastModified = fileInfo.mtime.toUTCString()*/

      /*if(mimeType){
        let expires = new Date()
        expires.setTime(expires.getTime() + CACHE_TIME * 1000)
        response.setHeader("Expires", expires.toUTCString())
        response.setHeader("Cache-Control", "max-age=" + CACHE_TIME)
        response.setHeader("Last-Modified", lastModified)
      }*/

      fs.readFile(realpath, "binary", function(err, file){
        if(err){
          response.writeHead(500, {'Content-Type': 'text/plain'})
          response.end(err)
        }else{
          response.writeHead(200, {'Content-Type': mimeType})
          response.write(file, "binary")
          response.end()
        }
      })
    }
  })
}
