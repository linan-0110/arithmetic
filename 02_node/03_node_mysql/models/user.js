const { Q } = require('../units/mysql/db')

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
        return Q(`insert into user(${Object.keys(data)}) 
            values (${''})`, Object.values(data))
    }
}