const express = require("express")
const tokenChecker = require("../middlware/tokenChecker")
const routes = express.Router()

///controller funktios====================
const {getOrCreate, getAll, getFriend, givingMessages, deleteConversation, clearMessages} = require("../controller/chatController")



//routes==================================
routes.post("/getOrCreate/:id", tokenChecker, getOrCreate)
routes.get("/getAll", tokenChecker, getAll)
routes.get("/friend/:id", tokenChecker, getFriend)
routes.delete("/deleteConversation/:id", tokenChecker, deleteConversation)
routes.delete("/clearMessages/:id", tokenChecker, clearMessages)

//routes get messages
routes.get("/messages/:id", tokenChecker,givingMessages)



///=======================================
module.exports = routes