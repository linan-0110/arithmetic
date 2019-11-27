const express = require('express')


let router = express.Router()

router.post('/', (req, res) => {
    // const { username, password } = req.body
    console.log(req.body)
    res.send({msg: 'OK'})
    
})

module.exports = router