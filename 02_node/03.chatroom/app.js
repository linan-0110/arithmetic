const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')
const render = require('koa-art-template')
const Router = require('koa-router')
const session = require('koa-session')
const path = require('path')


let app = new Koa()
let router = new Router()

/* ---------- 加入socket.io ---------- */
const IO = require('koa-socket')

const io = new IO()

global.sessionStore = {}

// 附加到app上
io.attach(app)

io.on('connection', (context, data) => {
    console.log('socket-server连接上！', data)
    // 广播发送数据
    io.broadcast('msg1', { msg: "socket-server" })
})
// 接收client发送来的信息
io.on('sendMsg', (context, data) => {
    // context.socket 是客户端的那个链接
    // context.socket.socket.id 是唯一标识（做私聊用）
    console.log("client发送来的消息", data.newContentText);
    console.log(global.sessionStore)
    // msgs.push({username: , content: data.newContentText})
    let userInfo = query(context.socket.socket.id)
    console.log("----++---------");
    console.log(userInfo);
    console.log(msgs)
    io.broadcast('msg1', msgs)

})
io.on('login', (context, data) => {
    console.log("client发送来的id", data.id);
    
    global.sessionStore[data.id].socketId = context.socket.socket.id
    console.log(global.sessionStore)
    // global.sessionStore[data.id].username = context.socket.socket.id
})

/* ---------- ---------- ---------- */



/* render 配置 */
render(app, {
    // render 查找页面的目录
    root: path.join(__dirname, 'views'),
    // 查找的后缀名
    extname: '.html',
    debug: process.env.NODE_ENV !== "production"
})

let msgs = [
    { username: '小魔女', content: '你过来呀！！！' },
    { username: '大大', content: 'wwwww！！！' },
    { username: '烦烦烦', content: '33333' }
]

/* ---------- start ---------- */
router.get('/', (ctx) => {
    ctx.render('index')
})
    .post('/login', (ctx) => {
        let { username, password } = ctx.request.body
        ctx.session.user = { username }
        // 生成一个唯一标识
        let id = Date.now()
        ctx.session.user.id = id
        global.sessionStore[id] = { username }
        console.log("-----登录-----")
        console.log(global.sessionStore)
        ctx.redirect('/list')
    })
    .get('/list', (ctx) => {
        ctx.render('list',
            {
                id: ctx.session.user.id,
                username: ctx.session.user.username,
                msgs
            })
    })
/* .post('/addNewContent', (ctx) => {
    let username = ctx.session.user.username || '用户未登录'
    let { newContentText } = ctx.request.body
    msgs.push({ username, content: newContentText })
    ctx.body = msgs
}) */


/* ---------- end ---------- */


/* 存储session */
const store = {
    myStore: {},
    set(key, session) {
        this.myStore[key] = session
    },
    get(key) {
        return this.myStore[key]
    },
    destroy(key) {
        delete this.myStore[key]
    }
}

/* static 配置 */
app.use(static('/public'))

/* bodyParser 配置 */
app.use(bodyParser());

/* session 配置 */
app.keys = ["test"]
app.use(session({ store }, app))

/* router 配置 */
app.use(router.routes())

/* 处理 status 405 501 */
app.use(router.allowedMethods())

app.listen(8888, () => {
    console.log("服务器启动在：loaclhost:8888");
})




/* 工具函数 */
// 查找 global.sessionStore 里面包含对应 socketId 的对象
function query(socketId) {
    let queryObj = {}
    Object.values(global.sessionStore).some(value => {
        if(value.socketId == socketId) {
            queryObj = value
        }
    });
    return queryObj
}