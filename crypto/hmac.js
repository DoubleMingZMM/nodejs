const crypto = require('crypto')

// 有MD5 sha1 sha256 sha512 这几种方式
const hmac = crypto.createHmac('md5', 'dan')
hmac.update('Daniel')
// 有hex binary base64
const hmacCode = hmac.digest('hex')
console.log("hmacCode=============================>", hmacCode)
