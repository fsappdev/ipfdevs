const express = require('express')
const router = express.Router()
const auth = require('../../middlewares/auth')
const Profile = require('../../models/Profile')
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
module.exports = router