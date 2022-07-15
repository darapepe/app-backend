const express = require('express')
require('dotenv').config()
require('./db/conexion')
const auth_route = require('./routes/auth')
const user_route = require('./routes/user')
const index_route = require('./routes/index')

//Settings
const app = express()
const port = process.env.PORT || 9000


//Middlewares (se ejecuta antes que el resto de funciones)
//app.use('/', cors(corsOptions), rutas)
app.use(express.json())
app.use('/', index_route)
app.use('/api', user_route)
app.use('/api/user', auth_route)



//Server Listening
app.listen(port, () => {
    console.log('Servidor corriendo en el puerto:', port);
})