const bcrypt = require("bcryptjs");

const hashPassword = async (req, res, next) => {
  if (req.body.password !== req.body.confirmPassword) {
    return res.status(400).send({ error: "Passwords do not match" });
  }
  if (req.body.password) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
  }
  next();
};

module.exports = hashPassword;
