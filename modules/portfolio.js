const mongoose = require("mongoose")

const portfolioSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true},
  workName: {type: String, required: true},
  niche: {type: String, required: true},
  photo: {type: String, required: true},
})

const Potfolio = mongoose.model("Portfolio", portfolioSchema)

module.exports = Potfolio