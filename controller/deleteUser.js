const {User} = require("../modules/user")

const deleteUser = async (req, res) => {
  try{
    const id = req.params.id

    if (!id) {
      return res.status(400).json({ message: "ID kiritilmegen" });
    }
    
    const user = await User.findByIdAndDelete(id)

    if(!user){
      return res.status(404).json({message: "Paydalaniwshi tabilmadi"})
    }

    res.status(200).json({message: "Oshirildi"})
  }
  catch(err){
    console.log(err.message)
    return res.status(500).send("Try bloki islemedi", err.message)
  }


}

module.exports = deleteUser