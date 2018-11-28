var request = require('request')

request.post("http://127.0.0.1:9999", {form: {name: 'daniel', age: 25}}, function(error, response, result) {
  console.log(result)
})
