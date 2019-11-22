const express = require('express');
const fs = require('fs');
const formidable = require('formidable');
const path = require('path');

let app = express();
let router = express.Router();

app.use(router)
// 暴露public下的文件（ 访问直接服务器地址加文件地址就可以 如：http://localhost:8888/index.js 就行）
app.use(express.static('./public'))
app.use(express.static('./images'))
app.listen(8888)

app.engine('.html', require('express-art-template'))
app.set('view engine', '.html')

app.set('view options', {
    debug: process.env.NODE_ENV !== 'production'
})

let dataList = [
    { name: '赵云', img: '1.jpg' },
    { name: '吕布', img: '2.jpg' },
    { name: '大桥', img: '3.jpg' },
    { name: '曹操', img: '4.jpg' },
    { name: '关羽', img: '5.jpg' }
];

router
    .get("/", (req, res) => {
        // index.html 是当前文件夹 views 下的 index.html
        res.render('index.html', { list: dataList });
    })
    .post('/add', (req, res, next) => {
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
            dataList.push({name, img: fileName});
            res.redirect('/');
        });
    })


    
// 处理报错的函数  (4个参数)
// app.use((err, req, res, next) => {
//     res.send("<h1>页面不在了<a href='/'>去首页看看</a></h1>")
// })

db.test_start.save({contry: "中国", name: "张三", score: 77});
db.test_start.save({contry: "中国", name: "王是", score: 44});
db.test_start.save({contry: "中国", name: "订单", score: 21});
db.test_start.save({contry: "中国", name: "李四", score: 92});
db.test_start.save({contry: "美国", name: "张二麻子", score: 66});
db.test_start.save({contry: "美国", name: "aaa", score: 66});
db.test_start.save({contry: "美国", name: "bbb", score: 29});
db.test_start.save({contry: "美国", name: "ccc", score: 56});
db.test_start.save({contry: "美国", name: "ddd", score: 80});
db.test_start.save({contry: "美国", name: "eee", score: 23});


db.test_start.find({score: {$gt: 80}}) // score大于80