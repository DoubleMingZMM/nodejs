// 需要下载
var request = require('request')

request.get("http://127.0.0.1:9999", function(error, response, result) {
  console.log("result============>", result)
})
