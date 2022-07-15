const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const router = express.Router()

//endpoint
router.post('/register', (request, response) => {
    //const { name, email, password, date } = request.body

    User.findOne({ email: request.body.email })
        .then(async result => {
            if (result === null) {

                let body = request.body

                const salt = await bcrypt.genSalt(Number(process.env.HASH_SALT))
                const password = await bcrypt.hash(body.password, salt)

                body = {
                    ...body,//traer una copia de lo que trae el body
                    password: password
                }

                //body.password = password //lo anterior tambien se puede hacer de esta manera

                const user = new User(body)

                user
                    .save()
                    .then(user => response.json(user))
                    .catch(error => response.json({ message: error }))
            } else {
                response.json({ message: 'Correo ya se encuentra registrado' })
            }
        })
        .catch(error => response.json({ message: error }))
})

router.post('/login', (request, response) => {
    User.findOne({ email: request.body.email })
        .then(result => {
            if (result != null) {
                bcrypt.compare(request.body.password, result.password)
                    .then(auth => {
                        if (auth) {
                            const token = jwt.sign({
                                name: result.name,
                                id: result._id
                            }, process.env.TOKEN_SECRET, { expiresIn: 2000 })

                            response
                                .header('auth-token', token)
                                .json({ message: 'Usuario Autenticado' })
                        } else {
                            response.json({ message: 'Password incorrecto' })
                        }
                    })
                    .catch(error => response.json({ message: error }))
            } else {
                response.json({ message: 'El correo no se encuentra' })
            }
        })
        .catch(error => response.json({ message: error }))
})

module.exports = router