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
const verifyToken = require("../middlewares/verifyToken.js");

router.route("/").get(verifyToken, getAllScores).post(verifyToken, addScore);
router.route("/:id").get(verifyToken, getUserNickname, getUserScores);
router.route("/last/:id").get(verifyToken, getUserNickname, getUserLastScores);
router.route("/high/:id").get(verifyToken, getUserNickname, getUserHighestScores);

module.exports = router;
