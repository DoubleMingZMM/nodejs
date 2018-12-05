const dgram = require('dgram')
const im = require('imagemagick')

const server = dgram.createSocket('udp4')

server.on('message',function(msg,rinfo) {
  const msgObj = JSON.parse(msg)
  console.log(rinfo.address + ':' + rinfo.port +' - ' + msg)
  resizeImage(msgObj.srcPath, msgObj.dstPath, msgObj.width, msgObj.height, function(ret) {
    let retJson = ''
    if (ret === -1) {
      retJson = {code: -1, msg: 'some error in udp!', data: {}}
    } else {
      retJson = {code: 0, msg: 'success', data: {name: msgObj.dstPath}}
    }

    const retStr = JSON.stringify(retJson)
    const message = new Buffer(retStr)

    server.send(message, 0 , message.length, 4444, '127.0.0.1')
  })
})

server.on('listening',function() {
  const address = server.address()
  console.log('udp server listening at ' + address.address + ':' + address.port)
})

function resizeImage(width, height, srcPath, dstPath, cb) {
  im.resize({
    srcPath: srcPath,
    dstPath: dstPath,
    width: width,
    height: height
  },function(err, stdout, stderr) {
    if (err) {
      console.log(stderr)
      cb(-1)
    } else {
      console.log(stdout)
      cb(stdout)
    }
  })
}

server.bind(4444)
