const fs = require('fs')
const BASE_DIR = __dirname

fs.exists(BASE_DIR + '/zm m.txt', function(exist) {
  if (exist) {
    console.log('file exist!')
  } else {
    console.log('file does not exist!')
  }
})
