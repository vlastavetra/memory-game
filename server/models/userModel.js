const User = require("./userSchema");

async function getUserById(userId) {
  try {
    const user = await User.findOne({ _id: userId });
    return user;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getUserById,
};
