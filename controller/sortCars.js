const Works = require("../modules/works")
const {User} = require("../modules/user")

const sortCars = async (req, res) => {
  try {
    const { profession } = req.query

    const currentUser = await User.findById(req.user._id);
    if (!currentUser) {
      return res.status(401).json({ message: "User topilmadi" });
    }

    const usersInLocation = await User.find({ "address.city": currentUser.address.city }).select("_id")
    const userIds = usersInLocation.map(u => u._id)

    let query = { "workType.niche": "Mashinasazliq", userId: { $in: userIds } }

    // profession di All manisine tekseriw
    if (profession && profession !== "All") {
      query["workType.profession"] = profession
    }

    const jobs = await Works.find(query).populate("userId", "title imgWork cost niche profession rating")

    res.status(200).json({ jobs })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = sortCars