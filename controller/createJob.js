const Works = require("../modules/works")


const createWork = async (req, res) => {

  try{


    const userId = req.user._id
    const {title, workType ,infoWork, buyersMust, cost, imgWork} = req.body;

    const niche = workType?.niche
    const profession = workType?.profession

    if (!userId || !title || !niche || !profession || !infoWork || !buyersMust || !cost || !imgWork) {
      return res.status(400).json({ message: "Barliq maydanlar toltirilgan boliwi kerkek" });
    }

    //jana jumisshini jaratiw
    const newWork = new Works({
      userId,
      title,
      workType: { niche, profession },
      imgWork,
      infoWork,
      buyersMust,
      cost
    })

    await newWork.save()

    res.status(201).json({message: "Jumis jaratildi", work: newWork})
  }
  catch(err){
    console.log(err)
    return res.status(500).json({message: err.message})
  }

}

module.exports = createWork