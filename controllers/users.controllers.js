
/**
 * para tener comentarios coloreados instalar la extension better comments
 * * ❕ informacion
 * ! ❗ alerta u error
 * ? 🤔 duda acerca del funcionamiento
 * TODO: 😓 refactorizar esta parte
 * @param myParam el parametro necesario para este codigo
*/


/**
 * * ❕ importamos las bibliotecas necesarias 
 */
const gravatar = require('gravatar')
const  bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const config = require('config')
const jwt = require('jsonwebtoken')


/** 
* * ❕ importamos el modelo de la BD el cual será consumido por los endpoints 
*/
const User = require('../models/User');

/** 
* * ❕ creamos el objeto controllador, este obj. será exportado para su uso por el endpoint 
* * ❕ este obj. es de uso gral. y contendrá múltiples propiedades.  
*/

ctrlUsers = {};

/** 
* * ❕ añadimos una o más propiedades dinámicamente al obj. controlador 
* * ❕ estas propiedades tiene el codigo necesario para ejecutar la accion requerida por el endpoint.  
*/

/** 
 * * ❕ controlador para la ruta POST api/users.  
 */
ctrlUsers.registerUser = async (req, res) => {
    
    console.log(req.body)
    
    const {name, email, password } = req.body

    console.log('incoming data=>', name, email, password)

    const errors = validationResult(req)

    if(!errors.isEmpty()){
            return res.status(400).json({errors :  errors.array()})
    }

   //check user existence
    try {
        let user = await User.findOne({email})
        if (user){ res.status(400).json({errors : [{msg: 'el usuario ya existe'}] })  }
        
        //get user gravatar

        const avatar = gravatar.url(email,{
            s: '200',
            r:'pg',
            d:'mm'
        })

        console.log(avatar)

        //new instance of user mongodb document model
        user = new User({
            name, 
            email,
            avatar,
            password
        })

         //encrypt passw
        const salt = await bcrypt.genSalt(10)

        user.password = await bcrypt.hash(password, salt)

        await user.save()
        
        //return jsonwebtoken
        
        const payload = {
            user : {
                id: user.id
            }
        }

        jwt.sign(
            payload, 
            config.get('jwtSecret'),
            {expiresIn: 3600},
            (err, token) => {
                if(err) throw err
                res.json({token})
            })
       
        /* console.log('user created')
        res.json({msg:'datos correctos user creado', datos : req.body.name + req.body.email}) */

    } catch (error) {
        console.error(error.message)
        res.status(500).send('server error')
    }

    /*  res.json({msg:`user route + ${req.body.name}`}) */
   
}

/** 
 * * ❕ controlador para la ruta GET api/users.  
 */
ctrlUsers.getAllUsers = async (req, res) => {
    try {
        
        const Users = await User.find().sort({date: -1})

        res.json(Users)

    } catch (error) {

        console.error(err.message)
        
        res.status(500).send('Server Error')
    }
}

module.exports = ctrlUsers




