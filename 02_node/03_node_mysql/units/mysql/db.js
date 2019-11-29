const { databas_test } = require('../../config/dbConfig')
var mysql = require('mysql');


let db = {
    // 查询函数封装
    Q(sql, data) {
        return new Promise((resolve, reject) => {
            var pool = mysql.createPool(databas_test);
            pool.getConnection(function (err, connection) {
                if (err) {
                    reject(err)
                    return
                }
                connection.query(sql, data, function (error, results, fields) {
                    connection.release();
                    if (error) {
                        reject(error)
                        return
                    }
                    resolve(results)
                });
            });
        })
    },
    // 生成文号字符串 如p(2) => '?,?'
    P(n) {
        let str = ''
        if (!n) return ''
        for (let i = 0; i < n - 1; i++) {
            str += "?,"
        }
        return str += "?"
    }
}

module.exports = db

