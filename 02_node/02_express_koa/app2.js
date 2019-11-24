const Koa = require('koa');
const fs = require('fs');

let app = new Koa();
app.use(async (ctx) => {
    if (ctx.url === '/') {
        // fs.readFileSync('./index.html');
        ctx.set('content-type','text/html;charset=utf-8')
        ctx.body = await asyncReadFile('./index.html')
    } else {
        ctx.body = '没有内容的route'
    }

})

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