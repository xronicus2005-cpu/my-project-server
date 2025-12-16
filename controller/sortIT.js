const Works = require("../modules/works")
const {User} = require("../modules/user") // User modelini import qilamiz

const sortIt = async (req, res) => {
  try {
    const { profession } = req.query;

    // 1️⃣ Current user'ni topamiz (tokenChecker ishlasa req.user._id bo‘ladi)
    const currentUser = await User.findById(req.user._id);
    if (!currentUser) {
      return res.status(401).json({ message: "User topilmadi" });
    }

    // Shu location'dagi user'larni topamiz
    const usersInLocation = await User.find({ "address.city": currentUser.address.city }).select("_id");
    const userIds = usersInLocation.map(u => u._id);


    // 3️⃣ Job filter
    let query = {
      userId: { $in: userIds },
      "workType.niche": "IT"
    };

    if (profession && profession !== "All") {
      query["workType.profession"] = profession;
    }

    // 4️⃣ Jobs'ni olish
    const jobs = await Works.find(query)
      .populate("userId", "title imgWork cost workType rating location"); // location ham chiqarish mumkin

    res.status(200).json({ jobs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = sortIt;
