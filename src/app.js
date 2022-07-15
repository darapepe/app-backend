const express = require('express')
require('dotenv').config()
require('./db/conexion')
const auth_route = require('./routes/auth')
const user_route = require('./routes/user')
const index_route = require('./routes/index')
const verify_token = require('./routes/verify_token')
const cors = require('cors')

//Settings
const app = express()
const port = process.env.PORT || 9000
var corsOptions = {
    origin: '*'
}

//Middlewares (se ejecuta antes que el resto de funciones)
//app.use('/', cors(corsOptions), rutas)
app.use(express.json())
app.use(cors(corsOptions))
app.use('/api/user', auth_route)
app.use(verify_token)
app.use('/', index_route)
app.use('/api', user_route)

//Server Listening
app.listen(port, () => {
    console.log('Servidor corriendo en el puerto:', port);
})