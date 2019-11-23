const MongoClient = require('mongodb').MongoClient;

// 数据库地址
const url = 'mongodb://localhost:27017';
// 数据库名
const DB_NAME = 'test02';


function _connect(callback) {
    // 连接数据库
    MongoClient.connect(url, (err, client) => {
        if (err) throw err; //连接异常
        // 获取db对象，再获取集合对象
        callback(client)
    })

}

/* 数据库操作函数 */
let $db = {
    /* 插入 */
    insert(cname, arrData, fn) {
        _connect(client => {
            const col = client.db(DB_NAME).collection(cname);
            col.insert(arrData, (err, result) => {
                fn(err, result);
                client.close();
            })
        })
    },
    /* 查询 */
    find(cname, filter, fn) {
        _connect(client => {
            const col = client.db(DB_NAME).collection(cname);
            col.find(filter).toArray((err, docs) => {
                fn(err, docs);
                client.close();
            })
        })
    },
    /* 更新 */
    update(cname, filter, updated, fn) {
        _connect(client => {
            const col = client.db(DB_NAME).collection(cname);
            col.update(filter, {$set: updated}, (err, result) => {
                fn(err, result);
                client.close();
            })
        })
    },
    /* 删除 */
    delete(cname, filter, fn) {
        _connect(client => {
            const col = client.db(DB_NAME).collection(cname);
            col.remove(filter, (err, result) => {
                fn(err, result);
                client.close();
            })
        })
    },
};

module.exports = $db
/* ---------------插入------------------ */
// let arrDate = [
//     { a: 1, b: 1 },
//     { a: 2, b: 2 },
//     { a: 3, b: 3 },
//     { a: 4, b: 4 },
//     { a: 5, b: 5 }
// ]
// $db.insert('col_1', arrDate, (err, result) => {
//     if(err) throw err;
//     console.log(result);
// })


/* ---------------查询------------------ */
// let filter = {a: 1}
// $db.find('col_1', filter, (err, docs) => {
//     if(err) throw err;
//     console.log(docs);
// })


/* ---------------更新------------------ */
// let filter = {a: 999}
// let updated = {a: 1000}
// $db.update('col_1', filter, updated, (err, result) => {
//     if(err) throw err;
//     // console.log(result.result.nModified);
//     console.log(result);
// })


/* ---------------删除------------------ */
// let filter = {a: 1}
// $db.delete('col_1', filter, (err, result) => {
//     if(err) throw err;
//     console.log(result);
// })