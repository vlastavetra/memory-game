const { addScoreModel } = require("../models/scoresModel");

const addScore = async (req, res) => {
  try {
    const score = await addScoreModel(req.body);
    res.status(200).send(`Saved ${score._id}`);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  addScore,
};
