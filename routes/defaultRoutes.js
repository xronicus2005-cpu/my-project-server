const express = require('express')
const tokenChecker = require("../middlware/tokenChecker")

const routes = express.Router()

//controller functions
const forIt = require("../controller/sortIT")
const forHand = require("../controller/sortHand")
const forTeach = require("../controller/sortTeach")
const forElektr = require("../controller/sortElektr")
const forCars = require("../controller/sortCars")

//routes
routes.get("/getJobsIt", tokenChecker, forIt)
routes.get("/getJobsHand", tokenChecker, forHand)
routes.get("/getJobsTeach", tokenChecker, forTeach)
routes.get("/getJobsElektr", tokenChecker, forElektr)
routes.get("/getJobsCars", tokenChecker, forCars)

module.exports = routes