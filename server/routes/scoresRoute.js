const express = require("express");
const router = express.Router();
const { addScore } = require("../controllers/scoresController.js");

router.route("/").get().post(addScore);
router.route("/:id").get();
router.route("/last/:id").get();
router.route("/high/:id").get();

module.exports = router;
