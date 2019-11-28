/* 路由 */
const Router = require('koa-router')
const { createTable, insertUserInfo } = require('../models/user')
let router = new Router()
let id = 0

router.get('/', (ctx) => {
    ctx.render('index')
})
.post('/user-addTable', (ctx) => {
    let a = createTable()
    console.log(a)
    ctx.body = a
})
.post('/user-register', async (ctx) => {
    let { user, password, mobile } = ctx.request.body
    id++
    let result = await insertUserInfo([id,user, password, mobile])
    console.log(result)
    ctx.body = {msg: 'OK',dbmsg: result}
})



module.exports = router