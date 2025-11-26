const Portfolio = require("../modules/portfolio")

const deletePortfolio = async(req, res) =>{

  try{

    const potfilioId = req.params.id

    const deletedPortfolio = await Portfolio.findByIdAndDelete(potfilioId)

    if(!deletedPortfolio){
      return res.status(404).json({message: "Portfolio tawilmadi"})
    }
    
    return res.status(200).json({message: "Oshirildi"})
  }
  catch(err){
    return res.status(500).json({message: err.message})
  }

}

module.exports = deletePortfolio