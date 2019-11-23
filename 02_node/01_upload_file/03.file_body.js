const express = require('express');
const formidable = require('formidable');
const path = require('path');
const $db = require('./dbTools')

let app = express();
let router = express.Router();

app.use(router)
// 暴露public下的文件（ 访问直接服务器地址加文件地址就可以 如：http://localhost:8888/index.js 就行）
app.use(express.static('./public'))
app.use(express.static('./images'))
app.listen(8888)

/* 服务端渲染 */
app.engine('.html', require('express-art-template'))
app.set('view engine', '.html')
app.set('view options', {
    debug: process.env.NODE_ENV !== 'production'
})


router
    .get("/", (req, res) => {
        $db.find('table_1', {}, (err, dataList, next) => {
            if(err) return next(err);
            // index.html 是当前文件夹 views 下的 index.html
            res.render('index.html', { list: dataList });
        })
        
    })
    .post('/add', (req, res, next) => {
        res.setHeader('enctype', "multipart/form-data")
        // 解析文件用 formidable
        let form = new formidable.IncomingForm();
        //  配置 指定上传路径
        form.uploadDir = path.join(__dirname, '/images');
        //  配置 保持原有后缀名
        form.keepExtensions = true;
        
        form.parse(req, (err, fields, files) => {
            console.log(files);
            // console.log(fields);
            let name = fields.name;
            let fileName = path.parse(files.headImg.path).base;
            $db.insert('table_1', {name, img: fileName}, (err, result) => {
                if(err) return next(err);
                res.redirect('/');
            })
        });
    })


    
// 处理报错的函数  (4个参数)
// app.use((err, req, res, next) => {
//     res.send("<h1>页面不在了<a href='/'>去首页看看</a></h1>")
// })