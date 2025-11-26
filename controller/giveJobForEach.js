const Works = require("../modules/works")


const giveJobForEach = async(req, res) => {

  try{
    
    const job = await Works.findById(req.params.id).populate("userId", "title niche profession imgWork infoWork buyersMust cost rating")
    if (!job) return res.status(404).json({ message: "Jumis tawilmadi" })
    
    return res.status(200).json({ job })
  }
  catch(err){
    return res.status(500).json({message: err.message})
  }

}

module.exports = giveJobForEach