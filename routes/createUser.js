const express = require('express')

const routes = express.Router()

const creatingUser = require("../controller/createUser")

routes.post("/enter/register", creatingUser)

module.exports = routes