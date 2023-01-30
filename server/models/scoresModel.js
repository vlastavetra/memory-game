const mongoose = require("mongoose");

const ScoreSchema = new mongoose.Schema({
  userId: { type: String, required: true },
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

module.exports = {addScoreModel, getScoresModel};
