
const User = require("../models/userSchema");

exports.getUser = async (req, res) => {
    try {
      console.log("ohoh" , req.params.id);
      const user = await User.findById(req.params.id);
      user.password = undefined;
      user.confirmPassword = undefined;
      res.status(200).send(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  