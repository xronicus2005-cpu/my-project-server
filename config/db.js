require('dotenv').config()

const mongoose = require('mongoose')

const dbAddress = process.env.MONGO_URI

const connectionDB = async () =>{

  try{
    await mongoose.connect(dbAddress)
    console.log("MB jalgandi")
  }
  
  catch(err){
    console.log("MB jalganbadi", err.message)
    process.exit(1)
  }

}

module.exports = connectionDB