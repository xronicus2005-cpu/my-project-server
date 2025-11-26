const Works = require("../modules/works")

const UpdateWork = async (req, res) => {

  try{
    const work = await Works.findOne({_id: req.params.id, userId: req.user._id})

    if(!work){
      return res.status(404).json({message: "Jumis tawilmadi"})
    }

    res.status(200).json({work}) 
  }
  catch(err){
    return res.status(500).json({message: err.message})
  }
}

module.exports = UpdateWork