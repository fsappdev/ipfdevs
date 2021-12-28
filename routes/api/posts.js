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

//@route DELETE api/posts/:id
//desc: DELETE post by Id
//@Private
 
router.delete('/:id', auth, async (req, res) => {
    try {
        
        const post = await Post.findById(req.params.id)

        
        if(!post){
            return res.status(404).json({msg: 'El post no existe'})
        }
        
        //check user
        if(post.user.toString() !== req.user.id){
            return res.status(401).json({msg: 'Usuario no autorizado'})
        }  

        await post.remove()

        res.json({msg: 'el post ha sido borrado'})

    } catch (err) {
        
        console.error(err.message)
        
        if(err.kind === 'ObjectId'){
            return res.status(404).json({msg: 'La publicacion no existe'})
        }

        res.status(500).send('Server Error')
    }
})

//@route PUT api/posts/like/:id
//desc: LIKE A post by Id
//@Private

router.put('/like/:id', auth, async (req, res) => {

    try {
        
        const post = await Post.findById(req.params.id)
        
        //check if the post has already been liked

        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
            return res.status(400).json({msg : 'el post ya ha sido likeado previamente'})
        }

        post.likes.unshift({ user: req.user.id })

        await post.save()

        return res.json(post.likes)

    } catch (err) {

        console.error(err.message)
        
        return res.status(500).send('Server Error')
    }

})

//@route PUT api/posts/unlike/:id
//desc: UNLIKE A post by Id
//@Private

router.put('/unlike/:id', auth, async (req, res) => {

    try {
        
        const post = await Post.findById(req.params.id)
        
        //check if the post has already been liked

        if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
            return res.status(400).json({msg : 'el post NO ha sido likeado previamente'})
        }

        //get the remove index
        //const removoIndex = post.likes.map(like = like.user.toString()).indexOf(req.user.id)
        const removeIndex = post.likes.map(like => like.user.toString() === req.user.id).indexOf() 

        post.likes.splice(removeIndex, 1)

        await post.save()

        return res.json(post.likes)

    } catch (err) {

        console.error(err.message)
        
        return res.status(500).send('Server Error')
    }

})

module.exports = router