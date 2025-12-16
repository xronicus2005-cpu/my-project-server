const { required } = require('joi')
const mongoose = require('mongoose')

const workShema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true},
  title: {type: String, required: true},
  workType: {
    niche: {type: String, required: true},
    profession: {type: String, required: true},
  },

  imgWork: {type: String, required: true},
  infoWork: {type: String, required: true},
  buyersMust: {type: String, required: true},
  
  cost: {type: String, required: true},

  rating: {type: String, default: 0.1},

  location:{type: String, required: true}
}, {timestamps: true})

const Work = mongoose.model("Works", workShema)

module.exports = Work