const {User, validateUser} = require('../modules/user')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const creatingUser = async (req, res) => {

  try{
    
    const {error} = validateUser(req.body)


    if(error){
      return res.status(400).json({message: error.details[0].message})
    }

    let user = await User.findOne({login: req.body.login})

    if(user){
      return res.status(400).json({message: "Bunday logindegi paydalaniwshi bar"})
    }

    //hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
  
    
    user = await new User({
      name: req.body.name,
      lastName: req.body.lastName,
      fathersName: req.body.fathersName,
      wasBorn: req.body.wasBorn,
      sex: req.body.sex,
      number: req.body.number,
      address: {state: req.body.address.state, city: req.body.address.city},
      login: req.body.login, 
      emailAddress: req.body.emailAddress,
      password: hashedPassword
    })

    await user.save()

    const key = process.env.PRIVTE_KEY
    
    const token = jwt.sign({_id: user._id, role: user.role}, key, {expiresIn: '1d'})
    res.json({login: true, token: token})


  }
  catch(err){
    return res.status(500).json({message: err.message})
  }
}

module.exports = creatingUser