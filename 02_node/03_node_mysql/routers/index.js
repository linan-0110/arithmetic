/* 路由 */
const Router = require('koa-router')
const { createTable, insertRegisterUserInfo, selectUserInfo } = require('../models/user')
const moment = require('moment')
moment.locale('zh-cn')

const router = new Router()

router.get('/', (ctx) => {
    ctx.render('index')
})
    .post('/user-addTable', async (ctx) => {
        let res = await createTable()
        if (res.warningCount === 0) {
            ctx.body = { status: 0, msg: "创建数据库成功！" }
        } else {
            ctx.body = { status: 0, msg: "数据库已经存在！" }
        }
    })
    .post('/user-register', async (ctx) => {
        let { user, password, mobile } = ctx.request.body
        let res = await insertRegisterUserInfo({ user, password, mobile, create_time: moment().format('YYYY-MM-DD HH:mm:ss') })
        console.log(res)
        if (res.warningCount === 0) {
            ctx.body = { status: 0, msg: "注册成功请登录！" }
        } else {
            ctx.body = { status: 0, msg: "账号已经存在！" }
        }
    })
    .post('/select-user-info', async (ctx) => {
        let res = await selectUserInfo()
        if (res.warningCount === 0) {
            ctx.body = { status: 0, data: res, msg: "成功！" }
        } else {
            ctx.body = { status: 0, res }
        }
    })


module.exports = router