const express = require('express')
const checkAuthenticated = require('../Middlewares/Auth')
const router = express.Router()

router.get('/', checkAuthenticated, (req, res)=>{
    res.status(200).json([
        {
            name: "mobile",
            price: 30000
        }, {
            name: 'tv',
            price: 10000
        }
    ])
})

module.exports = router