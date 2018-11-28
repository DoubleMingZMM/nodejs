const fs = require('fs')
const BASE_DIR = __dirname

fs.readFile(BASE_DIR + '/zmm.txt', 'binary', function(err, file) {
  if (err) throw err
  console.log(file)
})
