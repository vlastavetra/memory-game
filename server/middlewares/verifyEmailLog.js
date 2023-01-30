const bcrypt = require("bcryptjs");
const User = require("../models/userSchema");

const verifyEmailLogin = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password",
      });
    }
    next();
  } catch (err) {
    next(err);
  }
};
module.exports = verifyEmailLogin;
