const Works = require("../modules/works")

const sortCars = async (req, res) => {
  try {
    const { profession } = req.query

    let query = { "workType.niche": "Mashinasazliq" }

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