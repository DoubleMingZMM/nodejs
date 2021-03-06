/*static_module.js*/
var fs = require('fs');
var http = require('http');
var url = require('url');
var path = require('path');


var BASE_DIR = __dirname;
var STATIC = BASE_DIR  ;
var CACHE_TIME = 60*3;

const {lookup} = require('./conf/mime_type')


exports.getStaticFile = function(pathname, res, req){
  var mimeType = lookup(pathname);
  var realPath = STATIC + pathname;

  fs.exists(realPath, function(exists){
    if(!exists){
      console.log(realPath + " is not found.")
      res.writeHead(404, {'Content-Type':'text/plain'});
      res.write('Sorry, Not Found This Source.');
      res.end();
    }else{
      var fileInfo = fs.statSync(realPath);
      var lastModified = fileInfo.mtime.toUTCString();

      if(mimeType){
        var date = new Date();
        date.setTime(date.getTime() + CACHE_TIME * 1000);
        res.setHeader("Expires", date.toUTCString());
        res.setHeader("Cache-Control", "max-age=" + CACHE_TIME);
        res.setHeader("Last-Modified", lastModified);
      }
      if(req.headers['if-modified-since'] && lastModified == req.headers['if-modified-since'] ){
        res.writeHead(304, "Not Modified");
        res.end();
      }else{
        fs.readFile(realPath, "binary", function(err, file){
          if(err){
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end(err);
          }else{
            res.writeHead(200, {'Content-Type': mimeType});
            res.write(file, "binary");
            res.end();
          }
        })
      }
    }
  })
}
