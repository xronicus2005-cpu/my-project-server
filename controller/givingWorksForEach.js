const Portfolio = require("../modules/portfolio")

const giveWorkForEach = async(req, res) => {

  try{
    const userId = req.params.id
    
    const works = await Portfolio.find({userId})
    if (!works) return res.status(404).json({ message: "Jumis tawilmadi" })
    
    return res.status(200).json({ works })
  }
  catch(err){
    return res.status(500).json({message: err.message})
  }

}

module.exports = giveWorkForEach