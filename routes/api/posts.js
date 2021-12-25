const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const auth = require('../../middlewares/auth')
const User = require('../../models/User')
const Profile = require('../../models/Profile')
const Post = require('../../models/Post')


//@route POST api/posts
//desc: create post
//@private
router.post('/', [ auth, [
    check('text','text is required')
    .not()
    .isEmpty()
]], async (req, res) => {
    
    const errors = validationResult(req)
    
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array})
    }

    try {
        
        const user = await User.findById(req.user.id).select('-password')

        const newPost = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        }

        const post = new Post(newPost)

        await post.save()

        res.json(post)

    } catch (err) {

        console.error(err.message)
        
        res.status(500).send('Server Error')
    }

})

//@route GET api/posts
//desc: get all posts
//@public?? Private??
//private:=>router.get('/', auth ,async (req, res) => {
 
router.get('/', async (req, res) => {
    try {
        
        const posts = await Post.find().sort({date: -1})

        res.json(posts)

    } catch (error) {

        console.error(err.message)
        
        res.status(500).send('Server Error')
    }
})

//@route GET api/posts/:id
//desc: get post by Id
//@Private
 
    router.get('/:id', auth ,async (req, res) => {
        try {
            
            const post = await Post.findById(req.params.id)
            
            if(!post) return res.status(404).json({msg: 'La publicación no existe'}) 

            res.json(post)
    
        } catch (err) {
            
            console.error(err.message)
            
            if(err.kind === 'ObjectId'){
                return res.status(404).json({msg: 'La publicacion no existe'})
            }

            res.status(500).send('Server Error')
        }
    })

module.exports = router