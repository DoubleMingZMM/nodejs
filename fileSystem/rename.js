const fs = require('fs')
const BASE_DIR = __dirname
fs.rename(BASE_DIR + '/zmm.txt', BASE_DIR + '/aaa.txt', function(err) {
  if (err) throw err
  console.log('rename complete!')
})
