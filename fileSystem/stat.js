const fs = require('fs')
const BASE_DIR = __dirname
fs.stat(BASE_DIR + '/zmm.txt', function(err, state) {
  if (err) throw err
  console.log(state)
})
