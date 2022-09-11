const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const auth = require('../../middlewares/auth')
const { registerUser, getAllUsers } = require('../../controllers/users.controllers')

/** 
* * ❕ route POST api/users.
* * ❕ descripción: ruta de registración de nuevos users.
* * ❕ acceso: público.
*/

router.post('/', 
[
check('name', '-el nombre es requerido-').not().isEmpty(),
check('password', '-el password debe ser de un minimo de 6 caracteres-').isLength({min:6}),
check('email', '-debe incluir un email valido-').isEmail()  
],
registerUser
)

/** 
* * ❕ route GET api/users.
* * ❕ descripción: ruta que trae todos los users.
* * ❕ acceso: privado.
*/

router.get('/', 
auth,
getAllUsers
)

module.exports = router