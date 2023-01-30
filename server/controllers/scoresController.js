const {
  addScoreModel,
  getScoresModel,
  getScoresByUserNickname,
  getScoresByUserNicknameLast,
  getScoresByUserNicknameHighest,
} = require("../models/scoresModel");

const addScore = async (req, res) => {
  try {
    const score = await addScoreModel(req.body);
    res.status(200).send(`Saved ${score._id}`);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getAllScores = async (req, res) => {
  try {
    const allData = await getScoresModel();
    res.status(200).send(allData);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getUserScores = async (req, res) => {
  const { nickname } = req.body;
  try {
    const data = await getScoresByUserNickname(nickname);
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getUserLastScores = async (req, res) => {
  const { nickname } = req.body;
  try {
    const data = await getScoresByUserNicknameLast(nickname);
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getUserHighestScores = async (req, res) => {
  const { nickname } = req.body;
  try {
    const data = await getScoresByUserNicknameHighest(nickname);
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  addScore,
  getAllScores,
  getUserScores,
  getUserLastScores,
  getUserHighestScores,
};
