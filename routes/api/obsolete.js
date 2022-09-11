/**
 * * ❕ estos archivo contienen codigo desatendido
*/

/**
 * * ❕ proveniente del archivo users.js, fue reemplazado y reubicado en un controlador aparte.
*/

async (req, res) => {
    
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

    } catch (error) {
        console.error(error.message)
        res.status(500).send('server error')
    }

    /*  res.json({msg:`user route + ${req.body.name}`}) */
   
}

/* fin */


