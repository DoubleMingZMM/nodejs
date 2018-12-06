const mysql = require('mysql')

const connection = mysql.createConnection({
  host: '106.12.132.170',
  user: 'root',
  password: 'Z6m7m919930816',
  database : 'chatRoom'
})

connection.connect(function(err) {
  console.log('我连上Mysql了================>')
})

connection.query('select * from USER',function(err, rows) {
  console.log("rows=========================>", rows)
})

connection.end(function(err) {
  console.log('我退出MYsql了================>')
})
