var mysql = require('mysql')
const express = require('express')
const indexRouter = require('./routers')

let app = express()

// 声明使用解析post请求的中间件
app.use(express.urlencoded({ extended: true })) // 请求体参数是: name=tom&pwd=123
app.use(express.json()) // 请求体参数是json结构: {name: tom, pwd: 123}
app.use('/', indexRouter)  //

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '546260',
    database: 'test'
});

connection.connect((err, results) => {
    if (err) { throw err }
    else {
        console.log("----- mysql数据库连接成功！！-----")
        console.log(results)
        app.listen(8888, () => {
            console.log("----- 服务器运行在8888端口 -----")
        })
    }

});







// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });