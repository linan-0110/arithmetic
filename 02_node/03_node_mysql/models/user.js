const { Q } = require('../units/mysql/db')

module.exports = {
    async createTable() {
        let res = await Q(`CREATE TABLE IF NOT EXISTS  user(id int,user varchar(20),password varchar(30), mobile varchar(20))`,[])
        return res
    },
    async insertUserInfo(data) {
        let res = await Q(`insert into user(id, user, password, mobile ) values (?,?,?,?)`,[...data])
        return res
    }
}