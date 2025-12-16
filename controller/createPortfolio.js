const Portfolio = require("../modules/portfolio")

const createPortfolio = async(req, res) =>{

  try{

    const { workName, niche, photo } = req.body;
    
    //maydanlar manisi joq bolsa
    if(!workName || !niche || !photo){
      return res.status(400).json({message: "Maydanlar toltirilmagan"})
    }


    // user id di aliw
    const userId = req.user._id;

    // taza partfolio jaratiw
    const newPortfolio = new Portfolio({
      userId,
      workName,
      niche,
      photo
    });

    await newPortfolio.save();

    return res.status(201).json({
      message: "Jaratildi",
      portfolio: newPortfolio,
    });

    
  }
  catch(err){
    return res.status(500).json({message: err.message})
  }

}

module.exports = createPortfolio