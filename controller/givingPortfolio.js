const Portfolio = require("../modules/portfolio")

const givingPortfolio = async (req, res) => {
  
  try{

    const portfolio = await Portfolio.find({userId: req.user._id})
    return res.status(200).json({portfolio})
  }
  catch(err){
    return res.status(500).json({message: err.message})
  }


}
module.exports = givingPortfolio