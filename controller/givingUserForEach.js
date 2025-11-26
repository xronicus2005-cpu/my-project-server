const {User} = require("../modules/user")

const giveUserForEach = async(req, res) => {

  try{


    const user = await User.findById(req.params.id).select("-password")
    

    if(!user){
      return res.status(404).json({message: "Paydalaniwshi tawilmadi"})
    }

    return res.status(200).json({user})

    
  }
  catch(err){
    console.log("ERROR:", err)
    return res.status(500).json({message: err.meassage})
  }

}

module.exports = giveUserForEach