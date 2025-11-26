const express = require('express')

const routes = express.Router()

const emailChecker = require("../controller/emailchecker")

routes.post("/enter/check", emailChecker)

module.exports = routes