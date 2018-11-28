function execCallback(cb, name) {
  var time = 0
  var current = new Date()
  while(time < 5000) {
    time = new Date() - current
  }
  cb(name)
}

function callback(name) {
  console.log('执行回调', name)
}
execCallback(callback, 'zmm')

// 说明这是个同步的函数，只是调用了回调，如果是异步，则先输出 it is over!
console.log("it is over!")
