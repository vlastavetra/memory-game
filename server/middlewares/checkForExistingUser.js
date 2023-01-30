const User = require('../models/userSchema');

module.exports = (req, res, next) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      return res.status(500).send({ error: 'Error checking for existing user' });
    }

    if (user) {
      return res.status(400).send({ error: 'A user with this email address already exists' });
    }

    next();
  });
};
