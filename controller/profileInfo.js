const {User} = require('../modules/user')

const givingProfileInfo = async (req, res) =>{
  
  try{
    let user = await User.findById(req.user._id).select('-password')

    res.status(200).json(user)
  }
  catch(err){
    return res.status(500).json({message: err.message})
  }
}

module.exports = givingProfileInfo