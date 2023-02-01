const { getUserById } = require("../models/userModel");

const getUserNickname = async (req, res, next) => {
  const { id } = req.params;
  const user = await getUserById(id);
  req.body.username = user.username;

  next();
};

module.exports = {
  getUserNickname,
};
