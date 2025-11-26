const Works = require("../modules/works")

const givingWorks = async (req, res) => {

  try{
    const works = await Works.find({userId: req.user._id})
    return res.status(200).json({works})
  
  }
  catch(err){
    return res.status(500).json({message: err})
  }
}

module.exports = givingWorks