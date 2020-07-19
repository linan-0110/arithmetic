const { Q, P } = require('../units/mysql/db')

module.exports = {
    createTable() {
        return Q(`create table if not exists user(
            id int auto_increment primary key,
            user varchar(20),
            password varchar(30),
            mobile varchar(20),
            create_time datetime)
            `)
    },
    insertRegisterUserInfo(data) {
        let objKeyArr = Object.keys(data)
        return Q(`insert into user(${objKeyArr}) values (${P(objKeyArr.length)})`, Object.values(data))
    },
    selectUserInfo() {
        return Q(`select * from user`)
    }
}