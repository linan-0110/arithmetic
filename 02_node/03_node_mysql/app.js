const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const path = require('path')

let app = new Koa

/* 服务器渲染 配置 */
const render = require('koa-art-template')
render(app, {
    // render 查找页面的目录
    root: path.join(__dirname, 'views'),
    // 查找的后缀名
    extname: '.html',
    debug: process.env.NODE_ENV !== "production"
})

/* bodyParser 配置 */
app.use(bodyParser());

/* 路由配置 */
const router = require('./routers')
app.use(router.routes())
app.use(router.allowedMethods()) // 处理 status 405 501 


app.listen(8888, () => {
    console.log("----- 服务器启动在8888端口 ------")
})