const jwt = require('jsonwebtoken')

function tokenChecker(req, res, next) {

  const token = req.header('x-auth-token')

  if(!token){
    return res.status(401).send("Token haqiyqiy emes")
  }

  try{
    const decoded = jwt.verify(token, process.env.PRIVTE_KEY)
    req.user = decoded
    next()
  }
  catch(err){
    return res.status(400).send("Jaraqsiz token")
  }
}

module.exports = tokenChecker