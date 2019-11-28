const mysql = require('mysql')
var pool = mysql.createPool();

pool.getConnection(function (err, connection) {
    if (err) throw err; // not connected!
    connection.query('SELECT something FROM sometable', function (error, results, fields) {
        connection.release();
        if (error) throw error;
    });
})