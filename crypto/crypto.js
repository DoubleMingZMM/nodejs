const crypto = require('crypto')

// 有MD5 sha1 sha256 sha512 ripemd160这几种方式
const hash = crypto.createHash('md5')
hash.update('Daniel')
// 有hex binary base64
const hashCode = hash.digest('hex')
console.log("hashCode=============================>", hashCode)


const hash1 = crypto.createHash('md5')
hash1.update(new Buffer('Daniel', 'binary'))
const hashCode1 = hash1.digest('hex')
console.log("hashCode1=============================>", hashCode1)


const hash2 = crypto.createHash('sha1')
hash2.update(new Buffer('Daniel', 'binary'))
const hashCode2 = hash2.digest('hex')
console.log("hashCode2=============================>", hashCode2)


const hash3 = crypto.createHash('sha256')
hash3.update(new Buffer('Daniel', 'binary'))
const hashCode3 = hash3.digest('hex')
console.log("hashCode3=============================>", hashCode3)


const hash4 = crypto.createHash('sha512')
hash4.update(new Buffer('Daniel', 'binary'))
const hashCode4 = hash4.digest('hex')
console.log("hashCode4=============================>", hashCode4)



const hash5 = crypto.createHash('ripemd160')
hash5.update(new Buffer('Daniel', 'binary'))
const hashCode5 = hash5.digest('hex')
console.log("hashCode5=============================>", hashCode5)
