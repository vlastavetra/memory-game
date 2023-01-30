const express = require("express");
const router = express.Router();
const {
  addScore,
  getAllScores,
  getUserScores,
  getUserLastScores,
  getUserHighestScores
} = require("../controllers/scoresController.js");
const { getUserNickname } = require("../middlewares/scoresMiddleware");

router.route("/").get(getAllScores).post(addScore);
router.route("/:id").get(getUserNickname, getUserScores);
router.route("/last/:id").get(getUserNickname, getUserLastScores);
router.route("/high/:id").get(getUserNickname, getUserHighestScores);

module.exports = router;
