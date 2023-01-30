// dummy
const getUserNickname = (req, res, next) => {
  req.body.nickname = "vv";
  next();
};

module.exports = {
  getUserNickname,
};