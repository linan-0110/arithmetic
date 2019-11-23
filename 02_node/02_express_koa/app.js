// import express from 'express'
const express = require('express');

let server1 = express();

server1.use((req, res, next) => {
    res.send('express ok')
})

server1.listen(8888, () => {
    console.log('服务器启动在8888端口');
})


/* ----------- KOA ----------- */
const Koa = require('koa');
let server2 = new Koa();
server2.use((context, next) => {
    context.body = 'koa ok' 
    // context.request.url
    // context.request.method

    // context.response.set()
    // context.response.status = 200
    // context.response.body = ""
})
server2.listen(9999, () => {
    console.log('服务器启动在9999端口');
})