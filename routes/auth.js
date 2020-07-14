const router = require('express').Router();
const User = require('./../models/User')
const bcrpytjs = require('bcryptjs');
const jwt = require('jsonwebtoken')
const {registerValidation,loginValidation} = require('../validation')


router.post("/register",async (req,res)=>{

    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    // If user is already in the database
    const emailExist = await User.findOne({email:req.body.email})

    if(emailExist) return res.status(400).send("Email Already exist")


    // Hash the password
    const salt = await bcrpytjs.genSalt(10);
    const hashedPassword = await bcrpytjs.hash(req.body.password,salt)

    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword,
    })

    try {
        const savedUser = await user.save();
        res.status(200).send({user:savedUser._id})
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post("/login",async (req,res)=>{
    
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // If user is already in the database
    const user = await User.findOne({email:req.body.email})
    if(!user) return res.status(400).send("Email does not exist");

    // password is correct 
    const validPass = await bcrpytjs.compare(req.body.password,user.password)
    if(!validPass) return res.status(400).send("Invalid Password")

    // create and assign a token 
    const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET)
    res.header('auth-token',token).send(token);


    res.status(200).send("Loged in")

})


module.exports  = router;