const {User} = require("../modules/user")
const Joi = require("joi")

const emailChecker = async (req, res) =>{
  try{


    const {emailAddress} = req.body
    
    const {error} = validateEmail({emailAddress})

    if(error){
      return res.status(400).json({message: "Forma toltiriliwi kerek"})
    }

    const email = await User.findOne({emailAddress})

    if(email){
      return res.status(400).json({message: "Bunday emaildagi paydalaniwshi dizimnen otken"})
    }

    res.status(200).json({canEnter: true, message: "Ruxsat", emailAddress: emailAddress})
  }
  catch(err){
    return res.status(500).json({message: err.message})
  }
}

function validateEmail(body){

  const schema = Joi.object({
    emailAddress: Joi.string().email().required().min(5).max(50)
  })

  return schema.validate(body)

}

module.exports = emailChecker