const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json("You need to login first!");
  }
  jwt.verify(token, process.env.SECRET_KEY, async (error, data) => {
    if (error) {
      return res.status(403).json("Token is not valid!");
    }
    req.userId = data.id;
    console.log("passed jwt");
    next();
  });
};

module.exports = verifyToken;
