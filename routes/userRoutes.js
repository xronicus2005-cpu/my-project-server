const express = require('express')

const routes = express.Router()

////=======changing user information
const tokenChecker = require('../middlware/tokenChecker') // token tekseriwi
const updateUserInfo = require("../controller/changeUserInfo") // uliwmaliq user magliwmatlarin janalw
const deleteUser = require("../controller/deleteUser") //userdi bazadan oshiriw
////============creating work funktions

const givingWorks = require("../controller/givingWorks")
const findJob = require("../controller/updateJobs")




const deleteWork = require("../controller/deleteWork")

//////=======================================
const createJob = require("../controller/createJob")
const updeterPersonalInfo = require("../controller/updatePersonalInfo") // personal informaciyani janalaw
const updateWork = require("../controller/updateWorks")
const createPortfolio = require("../controller/createPortfolio") //portfoli jaratiw

//===========================
const givePortfoli = require("../controller/givingPortfolio") //paydalaniwshiga portfoliosin beriw
const deletedPortfolio = require("../controller/deletePortfolio")

/////////////////=================see informations
const giveJobForEach = require("../controller/giveJobForEach")
const giveUserForEach = require("../controller/givingUserForEach")
const givePortfolioForEach = require("../controller/givingWorksForEach")

///getallusers
const getAllUsers = require("../controller/getAllUsers")

//========users operations

routes.post("/updateProfile", tokenChecker, updeterPersonalInfo)
routes.put("/updateWork/:id", tokenChecker, updateWork)
///==================================================
routes.put("/update/:id", tokenChecker, updateUserInfo)
routes.delete("/delete/:id",tokenChecker, deleteUser)



/////===================creating work
routes.post("/create", tokenChecker, createJob)

routes.get("/works", tokenChecker, givingWorks)
routes.get("/works/:id", tokenChecker, findJob)

routes.delete("/deleteWork/:id", tokenChecker, deleteWork)

///creating portfolio
routes.post("/createPortfolio", tokenChecker, createPortfolio)
routes.get("/myPortfolio", tokenChecker, givePortfoli)
routes.delete("/deletePortfolio/:id", tokenChecker, deletedPortfolio)

//see informations about jobs
routes.get("/getJob/:id", tokenChecker, giveJobForEach)
routes.get("/getUser/:id", tokenChecker, giveUserForEach)
routes.get("/getUserWorks/:id", tokenChecker, givePortfolioForEach)


///for universal users
routes.get("/getAllUsers", getAllUsers)

module.exports = routes