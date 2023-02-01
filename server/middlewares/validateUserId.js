const User = require("../models/userSchema");

const validateUserId = async (req, res, next) => {
  try {
    
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "Invalid user ID" });
    }
    next();
  } catch (error) {
   
    return res.status(500).json({ message:  error.message });
  }
};
module.exports = validateUserId;