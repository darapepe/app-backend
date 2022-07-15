const express = require('express')
const router = express.Router()

//endpoint
router.get('/', (request, response) => {
    response.json({
        message: 'Bienvenido!!!'
    })
})

module.exports = router