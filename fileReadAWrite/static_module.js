/*static_module.js*/
var fs = require('fs');
var http = require('http');
var url = require('url');
var path = require('path');


var BASE_DIR = __dirname;
var STATIC = BASE_DIR  ;

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
  })
}
