const {User} = require('../modules/user')
const Joi = require('joi')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const auth = async (req, res) => {

  try{
    
    const {error} = validation(req.body)
    
    if(error){
      return res.status(400).json({message: error.details[0].message})
    }

    

    let user = await User.findOne({login: req.body.login})

    if(!user){
      return res.status(400).json({message: "login yamasa parol qate"})
    }

    const password = req.body.password

    const isValidatePassword = await bcrypt.compare(password, user.password)

    
    
    if(!isValidatePassword){
      return res.status(400).json({message: "login yamasa parol qate"})
    }

    const key = process.env.PRIVTE_KEY

    const token = jwt.sign({_id: user._id, role: user.role}, key, {expiresIn: '7d'})
    res.json({login: true, token: token})
  }

  catch(err){
    return res.status(500).json({message: err.message})
  } 
}

function validation(body){

  const schema = Joi.object({
    login: Joi.string().min(5).max(25).required().trim(),
    password: Joi.string().required().trim()
  })

  return schema.validate(body)
}

module.exports = auth