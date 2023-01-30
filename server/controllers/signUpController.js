const User = require("../models/userSchema");

exports.signup = async (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
  };
  try {
    const user = await User.create(newUser);
    res.status(201).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
