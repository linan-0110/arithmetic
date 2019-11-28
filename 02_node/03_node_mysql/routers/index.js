/* 路由 */
const Router = require('koa-router')
const { createTable, insertRegisterUserInfo } = require('../models/user')

const router = new Router()

router.get('/', (ctx) => {
    ctx.render('index')
})
.post('/user-addTable', async (ctx) => {
    let res = await createTable()
    if(res.warningCount === 0) {
        ctx.body = {status: 0, msg: "创建数据库成功！"}
    } else {
        ctx.body = {status: 0, msg: "数据库已经存在！"}
    }
})
.post('/user-register', async (ctx) => {
    let { user, password, mobile } = ctx.request.body
    let result = await insertRegisterUserInfo({user, password, mobile})
    console.log(result)
    ctx.body = {msg: 'OK',dbmsg: result}
})



module.exports = router