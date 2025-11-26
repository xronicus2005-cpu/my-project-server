const express = require('express')

const routes = express.Router()

const authentificattion = require("../controller/auth")
const tokenChecker = require("../middlware/tokenChecker")
const givingUserInfo = require("../controller/profileInfo")


//entering the sysetm
routes.post("/auth", authentificattion)
routes.get("/me", tokenChecker, givingUserInfo)

module.exports = routes