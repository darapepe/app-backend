const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.write('Hola  Mundo')
    res.end()
})

module.exports = router