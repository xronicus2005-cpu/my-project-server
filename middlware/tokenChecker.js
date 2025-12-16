const jwt = require("jsonwebtoken");

async function tokenChecker(req, res, next) {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ message: "Token joq" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded

    next();

  } catch (err) {
    return res.status(400).json({ message: "Jaraqsiz token" });
  }
}

module.exports = tokenChecker;
