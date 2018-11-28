const fs = require('fs')
const BASE_DIR = __dirname

fs.chmod(BASE_DIR + '/zmm.txt', 777, function(err) {
  if (err) throw err
  console.log('chmod complete!')
})
