const { getUserById } = require("../models/userModel");

const getUserNickname = async (req, res, next) => {
  const { id } = req.params;
  const user = await getUserById(id);
  req.body.nickname = user.username;

  next();
};

module.exports = {
  getUserNickname,
};
