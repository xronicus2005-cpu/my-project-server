const Works = require("../modules/works")

const deleteWork = async (req, res) => {

  try{

    const workId = req.params.id

    const deletedWork = await Works.findByIdAndDelete(workId)

    if(!deletedWork){
      return res.status(404).json({message: "Jumis tawilmadi"})
    }

    return res.status(200).json({message: "Oshirildi"})

  }
  catch(err){
    return res.status(500).json({message: err})
  }
}

module.exports = deleteWork