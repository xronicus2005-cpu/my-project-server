const Works = require("../modules/works")

const updateWork = async (req, res) => {

  try{

    const workId = req.params.id

    const updatedWork = await Works.findByIdAndUpdate(workId,
      {
      title: req.body.title,
      workType: {
        niche: req.body.niche,
        profession: req.body.profession
      },
      infoWork: req.body.infoWork,
      buyersMust: req.body.buyersMust,
      cost: req.body.cost,
      ...(req.file && {imgWork: req.file.filename})
    }, {new: true})

    if(!updatedWork){
      return res.status(404).json({message: "Jumis tawilmadi"})
    }

    return res.status(200).json({message: "Janalandi", work: updatedWork})


  }
  catch(err){
    return res.status(500).json({message: err})
  }
}

module.exports = updateWork