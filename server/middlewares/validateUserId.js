const User = require("../models/userSchema");

const validateUserId = async (req, res, next) => {
  try {
    console.log("here" , req.params.id);
    const user = await User.findById(req.params.id);
    console.log("user" , user);
    if (!user) {
      return res.status(404).json({ message: "Invalid user ID" });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message:  error.message });
  }
};
module.exports = validateUserId;