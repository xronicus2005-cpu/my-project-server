const {User} = require('../modules/user')
const Joi = require("joi")

const updeterPersonalInfo = async (req, res) => {

  try{


    const userID = req.user._id
    
    const {name, lastName, fathersName, job, info, imgProfile} = req.body

    const {error} = validationOfUpdetedUser(req.body)
    console.log(error)
    

    if(error){
      return res.status(400).json({message: error.details[0].message})
    }

    const updatedDate = {name, lastName, fathersName, job, info}

    if(imgProfile){
      updatedDate.imgProfile = imgProfile
    }

    await User.findByIdAndUpdate(userID, updatedDate, {new: true})
    const updatedUser = await User.findById(userID)
    
    res.json({updated: true, user: updatedUser})
  }
  catch(err){
    console.log(err)
    return res.status(500).json({message: err})
  }
}

function validationOfUpdetedUser(body){

  const schema = Joi.object({
    name: Joi.string().min(3).max(25).required(),
    lastName: Joi.string().min(3).max(25).required(),
    fathersName: Joi.string().min(3).max(25).required(),
    job: Joi.string().min(3).max(50).required(),
    info: Joi.string().max(255).min(10).allow("").optional(),
    imgProfile: Joi.string().optional(),

  })

  return schema.validate(body)
}

module.exports = updeterPersonalInfo