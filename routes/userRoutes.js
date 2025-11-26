const express = require('express')

const routes = express.Router()

////=======changing user information
const tokenChecker = require('../middlware/tokenChecker') // token tekseriwi
const updateUserInfo = require("../controller/changeUserInfo") // uliwmaliq user magliwmatlarin janalw
const deleteUser = require("../controller/deleteUser") //userdi bazadan oshiriw
////============creating work funktions
const createJob = require("../controller/createJob")
const givingWorks = require("../controller/givingWorks")
const findJob = require("../controller/updateJobs")

const updeterPersonalInfo = require("../controller/updatePersonalInfo") // personal informaciyani janalaw
const upload = require("../middlware/saveFiles") // personal informaciya fotosin saqlaw yani avatar fotosin
const uploadWork = require("../middlware/saveJobImg") ///jumis foftosin saqlaw
const updateWork = require("../controller/updateWorks")
const deleteWork = require("../controller/deleteWork")

const uploadPortfolio = require("../middlware/savePortfolioImg") // portfolio fotosin saqlaw

const createPortfolio = require("../controller/createPortfolio") //portfoli jaratiw
const givePortfoli = require("../controller/givingPortfolio") //paydalaniwshiga portfoliosin beriw
const deletedPortfolio = require("../controller/deletePortfolio")

/////////////////=================see informations
const giveJobForEach = require("../controller/giveJobForEach")
const giveUserForEach = require("../controller/givingUserForEach")
const givePortfolioForEach = require("../controller/givingWorksForEach")

///getallusers
const getAllUsers = require("../controller/getAllUsers")

//========users operations
///==================================================
routes.put("/update/:id", tokenChecker, updateUserInfo)
routes.delete("/delete/:id",tokenChecker, deleteUser)
routes.post("/update", tokenChecker, upload.single("imgProfile"), updeterPersonalInfo)


/////===================creating work
routes.post("/create", tokenChecker, uploadWork.single("imgWork") ,createJob)
routes.get("/works", tokenChecker, givingWorks)
routes.get("/works/:id", tokenChecker, findJob)
routes.put("/updateWork/:id", tokenChecker, uploadWork.single("imgWork"), updateWork)
routes.delete("/deleteWork/:id", tokenChecker, deleteWork)

///creating portfolio
routes.post("/createPortfolio", tokenChecker, uploadPortfolio.single("photo"),createPortfolio)
routes.get("/myPortfolio", tokenChecker, givePortfoli)
routes.delete("/deletePortfolio/:id", tokenChecker, deletedPortfolio)

//see informations about jobs
routes.get("/getJob/:id", tokenChecker, giveJobForEach)
routes.get("/getUser/:id", tokenChecker, giveUserForEach)
routes.get("/getUserWorks/:id", tokenChecker, givePortfolioForEach)

///for universal users
routes.get("/getAllUsers", getAllUsers)

module.exports = routes