const express = require('express')
const router = express.Router()
const auth = require('../../middlewares/auth')
const Profile = require('../../models/Profile')
const User = require('../../models/User')
const { check, validationResult} = require('express-validator')

//@route GET api/profile/me
//desc: get current users profile
//@private
router.get('/me', auth , async (req, res) => {
    console.log(req.body)
    try {

        const profile = await Profile.findOne({user : req.user.id}).populate('user',  ['name','avatar'])
        
        if(!profile) return res.status(400).json({msg:  'NO existe tal usuario'})
        
        res.json(profile)

    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server Error')
    }
})

//@route POST api/profile/
//desc: create or update user profile
//@private
router.post('/', [auth,[
    check('status','Status is required').not().isEmpty(),
    check('skills','Skills is required').not().isEmpty()
]], async (req, res) => {

        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        const {
            company, website, location, bio, status, githubusername, 
            skills, youtube, facebook, twitter, instagram, linkedin 
        } = req.body

        //construimos el profile object
        const profileFields = {}
        profileFields.user = req.user.id
        if(company) profileFields.company = company
        if(website) profileFields.website = website
        if(location) profileFields.location = location
        if(bio) profileFields.bio = bio
        if(status) profileFields.status = status
        if(githubusername) profileFields.githubusername = githubusername
        if(skills) profileFields.skills = skills.split(',').map(skill => skill.trim()) 
        //console.log(skills)
        //res.send('aaaaaa....')

        //build 
        profileFields.social = {}
        if (youtube) profileFields.social.youtube = youtube
        if (facebook) profileFields.social.facebook = facebook
        if (twitter) profileFields.social.twitter = twitter
        if (instagram) profileFields.social.instagram = instagram
        if (linkedin) profileFields.social.linkedin = linkedin

        try {
          
            let profile = await Profile.findOne({ user: req.user.id})  

            if(profile){ //update or...
                
                profile = await Profile.findOneAndUpdate(
                    {user: req.user.id}, 
                    {$set: profileFields }, 
                    {new: true}
                )
                
                console.log('actualizado con exito')
                return res.json(profile)

            }
            
            //

            profile = new Profile(profileFields) //...create

            await profile.save()

            console.log('creado con exito')

            return res.json(profile)
            
        } catch (err) {
            console.error(err.message)
            res.status(500).send('server error')
        }
    } 
)

//@route GET api/profile/
//desc: get all profiles
//@public
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar'])
        res.json(profiles)
    } catch (error) {
        console.log(error)
        res.status(500).send('server error')
    }
})

//@route GET api/profile/user/:user_id
//desc: get profile by user_id
//@public
router.get('/user/:user_id', async (req, res) => {

    const query = req.params.user_id

    try {
        const profile = await Profile.findById(query).populate('user', ['name', 'avatar'])

        if(!profile)return res.status(400).json({msg: 'error - profile not found - '})

        res.json(profile)

    } catch (error) {
        console.log(error)
        if(error.kind == "ObjectId" ){
            return res.status(400).send({msg: 'error - profile not found - '})
        }
        res.status(500).send('server error')
    }
})

//@route DELETE api/profile
//desc: DELETE profile, user, post by user_id
//@private
router.delete('/', auth, async (req, res) => {
    
    const queryProfile = {user : req.user_id}
   

    try {
        //TODO: REMOVE USERS POSTS
        //remove profile
        await Profile.findOneAndDelete(queryProfile)
        //remove user
        await User.findByIdAndDelete(req.user.id)

        res.json({msg: 'User Deleted'})

    } catch (error) {
        console.log(error)
        
        res.status(500).send('server error')
    }
})

//@route PUT api/profile/experience
//desc: add profile experience
//@private
router.put(
    '/experience',
    [
        auth,
        [
            check('title', 'title is required').not().isEmpty(),
            check('company', 'company is required').not().isEmpty(),
            check('from', 'from date is required').not().isEmpty(),
        ]
    ],
    async (req, res) => {

        const errors = validationResult(req)
        
        if(!errors.isEmpty()){
            return res.status(400).json({errors : errors.array() })
        }

        const {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        } = req.body

        const newExp = {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        }

        try {
            
            const profile = await Profile.findOne({ user : req.user.id })

            profile.experience.unshift(newExp)

            await profile.save()

            res.json(profile)

        } catch (err) {
            console.error(err.message)
            res.status(500).send('Server error')
        }
    }
)

//@route DELETE api/profile/experience/:exp_id
//desc: delete experience from profile
//@private
router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        
        const profile = await Profile.findOne({ user : req.user.id })
        
        //get the remove index  
        //const removeIndex = await Profile.experience.filter(item => item.id).indexOf(req.params.exp_id)

        const removeIndex = await profile.experience.filter(item => item.id === req.params.exp_id).indexOf()

        profile.experience.splice(removeIndex, 1)

        await profile.save()

        res.json(profile)

    } catch (err) {
        console.error(err.message)
        res.status(500).send('server error')
    }
} )

module.exports = router