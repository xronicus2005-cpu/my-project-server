const express = require('express')

const routes = express.Router()

//controller functions
const forIt = require("../controller/sortIT")
const forHand = require("../controller/sortHand")
const forTeach = require("../controller/sortTeach")
const forElektr = require("../controller/sortElektr")
const forCars = require("../controller/sortCars")

//routes
routes.get("/getJobsIt", forIt)
routes.get("/getJobsHand", forHand)
routes.get("/getJobsTeach", forTeach)
routes.get("/getJobsElektr", forElektr)
routes.get("/getJobsCars", forCars)

module.exports = routes