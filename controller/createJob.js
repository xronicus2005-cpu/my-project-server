const Works = require("../modules/works")


const createWork = async (req, res) => {

  try{


    const userId = req.user ? req.user._id : req.body.userId;
    const {title, niche, profession, infoWork, buyersMust, cost} = req.body;


    let imgWork = null;
    if (req.file) {
      imgWork = req.file.filename; // Multer saqlagan fayl nomi
    }

    if (!userId || !title || !niche || !profession || !infoWork || !buyersMust || !cost) {
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