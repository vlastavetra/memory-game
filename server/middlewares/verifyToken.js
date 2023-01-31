const jwt = require("jsonwebtoken");
const SECRET = process.env.TOKEN_SECRET;

async function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    res.status(401).send("Missing token");
    return;
  }
  const token = req.headers.authorization.replace("Bearer ", "");
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      res.status(401).send("You are not logged in");
      return;
    }
    if (decoded) {
      
      req.body.id = decoded.id;
      req.body.admin = decoded.admin;
      next();
    }
  });
}

module.exports = verifyToken;