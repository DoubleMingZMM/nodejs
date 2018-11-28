const fs = require('fs')
const BASE_DIR = __dirname

fs.unlink(BASE_DIR + '/aaa.txt', function(err) {
  if (err) throw err
  console.log('unlink complete!')
})
