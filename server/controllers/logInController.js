const jwt = require("jsonwebtoken");
const SECRET = process.env.TOKEN_SECRET;  
const Users = require("../models/userSchema");

exports.login = async (req, res) => {
const user = await Users.findOne({ email: req.body.email});
  const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "1d" });

  user.password = undefined;

 return res.status(200).json({ id: user._id, token: token });

};
