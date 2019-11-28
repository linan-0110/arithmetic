const { databas_test } = require('../../config/dbConfig')
var mysql = require('mysql');


let db = {
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
    }
}

module.exports = db

