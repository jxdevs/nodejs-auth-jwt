const {Router} = require("express")
const router = Router();
const User = require('../models/User')
const jwt = require('jsonwebtoken')

const secreto = "Secreto"

router.get('/',(req,res)=>{
 res.send("Hola mundo api")
})

router.post('/signup',async (req,res)=>{
   
    const {email,password} = req.body
    const newUser = new User({email,password})
    await newUser.save()
    const token = jwt.sign({_id:newUser._id},secreto)
    res.status(200).json({token})
   })


   router.post('/signin',async (req,res)=>{
   
    const {email,password} = req.body
    const user = await User.findOne({email})
    if(!user){
        return res.status(401).send("Correo no existe")
    }

    if(user.password !== password){
        return res.status(401).send("Password No existe")
    }

    const token = jwt.sign({_id:user._id},secreto)
    res.status(200).json({token})
   })


   router.get('/private',verifyToken,(req,res)=>{
    res.send("Datos Privados")
   })

module.exports = router

function verifyToken(req,res,next){
   
  if(!req.headers.authorization){
    return res.status(401).send("No Autorizado");
  }

  const token = req.headers.authorization.split(' ')[1]

  if(!token){
    return res.status(401).send("No Autorizado");
  }

  const payload = jwt.verify(token, secreto)
  req.userId = payload._id
  next()

}