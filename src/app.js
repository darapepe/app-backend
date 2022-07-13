const express = require('express')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 9000

const rutas = require('./Routes/rutas')

//app.use('/', cors(corsOptions), rutas)
app.use('/', rutas)

app.listen(port, () => {
    console.log('Servidor ejecutandose en el puerto', port)
})