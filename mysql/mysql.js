const mysql = require('mysql')

const connection = mysql.createConnection({
  host: '106.12.132.170',
  user: 'root',
  password: 'Z6m7m919930816',
  database : 'chatRoom'
})

let result = ''

const sql = 'insert into USER values (null, "明明", "男", ?)'

const sqlParams = [20]

// 这些都是异步函数
connection.connect(function(err) {
  console.log('我连上Mysql了================>')
})

connection.query('select * from USER',function(err, rows) {
  result = rows
  printResult()
})

connection.query(sql,sqlParams,function(err, rows) {
  result = rows
  printResult()
})

connection.end(function(err) {
  console.log('我退出MYsql了================>')
})

function printResult() {
  console.log("result==================>", result)
}
