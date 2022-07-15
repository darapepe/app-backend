const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcrypt')

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

module.exports = router