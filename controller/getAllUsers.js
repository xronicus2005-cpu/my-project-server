const {User} = require("../modules/user")

const getAllUsers = async(req, res) => {
  try{
    // 1) Barcha userlar soni
    const totalUsers = await User.countDocuments();

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const weeklyUsers = await User.countDocuments({
      createdAt: { $gte: oneWeekAgo }
    });

    return res.status(200).json({totalUsers, weeklyUsers})
  }
  catch(err){
    console.log(err)
  }
}

module.exports = getAllUsers
