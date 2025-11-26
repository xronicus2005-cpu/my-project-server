const Joi = require('joi')
const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
  name:{type: String, required: true},
  lastName:{type: String, required: true},
  fathersName:{type: String, required: true},
  wasBorn:{type: Date, required: true},

  sex:{type: String, required: true},
  number: {type: String, required: true},
  address:{state:{type: String, required: true}, city:{type: String, required: true}},
  login:{type: String, required: true, unique: true},
  
  emailAddress:{type: String, required: true, unique: true},
  password:{type: String, required: true},

  role: {type: String, default: "user"},
  createdAt: {type: Date, default: Date.now},

  job: {type: String, default: ""},
  info: {type: String, default: ""},
  imgProfile: {type: String, default: ""}
})

const User = mongoose.model("Users", userSchema)

function validateUser(user){

  const schema = Joi.object({
    name: Joi.string().min(3).max(25).required(),
    lastName: Joi.string().min(3).max(25).required(),
    fathersName: Joi.string().min(3).max(25).required(),
    wasBorn: Joi.date().required(),
    sex: Joi.string().required(),
    number: Joi.string().required(),
    address: Joi.object({state: Joi.string().required(), city: Joi.string().required()}).required(),
    login: Joi.string().min(5).max(50).required(),
    emailAddress: Joi.string().min(5).max(25).email().required(),
    password: Joi.string().required().min(5).max(1024),

    role: Joi.string(),
    createdAt: Joi.date(),

    
    job: Joi.string(),
    info: Joi.string(),
    imgProfile: Joi.string().allow("")
  })

  return schema.validate(user)

}

module.exports = {User, validateUser}