const mysql = require('mysql')
var pool = mysql.createPool({
    host: 'localhost',
    user: 'me',
    password: '546260',
    database: 'test'
});

pool.getConnection(function (err, connection) {
    if (err) throw err; // not connected!
    connection.query('SELECT something FROM sometable', function (error, results, fields) {
        connection.release();
        if (error) throw error;
    });
})