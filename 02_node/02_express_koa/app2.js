const Koa = require('koa');
const fs = require('fs');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser')




let app = new Koa();
let router = new Router();

router
.get('/', async (ctx, next) => {
    // fs.readFileSync('./index.html');
    ctx.set('content-type','text/html;charset=utf-8')
    ctx.body = await asyncReadFile('./index.html')
    next()
})
.post('/login', ctx => {
    let account = ctx.request.body.account;
    let password = ctx.request.body.password;
    console.log(ctx.request.body);
    if(account != "abc" || password != '123') {
        ctx.body = {
            ok: false,
            msg: '账号密码不存在！'
        }
    } else {
        ctx.body = {ok: true,msg: '登录成功！'}
    }
})

// 将路由与实例关联
app.use(bodyParser());
app.use(router.routes())
// 优化返回的状态码 （如404,501 统一都是404）
app.use(router.allowedMethods())
app.listen(8888, (err) => {
    if (err) throw err;
    console.log("----- 服务器启动在8888端口 -----");
})

/* 异步读取文件 */
function asyncReadFile(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if(err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })


}