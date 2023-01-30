const mongoose = require("mongoose");

const ScoreSchema = new mongoose.Schema({
  nickname: { type: String, required: true },
  score: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const Score = mongoose.model("Score", ScoreSchema);

async function addScoreModel(obj) {
  try {
    const score = await Score.create(obj);
    return score;
  } catch (err) {
    console.log(err);
  }
}

async function getScoresModel() {
  try {
    const scores = await Score.find();
    return scores;
  } catch (err) {
    console.log(err);
  }
}

async function getScoresByUserNickname(nickname) {
  try {
    const userScores = await Score.find({ nickname: nickname });
    return userScores;
  } catch (err) {
    console.log(err);
  }
}

async function getScoresByUserNicknameLast(nickname) {
  try {
    const userScores = await Score.find({ nickname: nickname })
      .sort({ date: -1 })
      .limit(1);
    return userScores;
  } catch (err) {
    console.log(err);
  }
}

async function getScoresByUserNicknameHighest(nickname) {
  try {
    const userScores = await Score.find({ nickname: nickname })
      .sort({ score: -1 })
      .limit(1);
    return userScores;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  addScoreModel,
  getScoresModel,
  getScoresByUserNickname,
  getScoresByUserNicknameLast,
  getScoresByUserNicknameHighest,
};
