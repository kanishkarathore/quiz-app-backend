const express = require("express");
const router = express.Router();

const { createQuiz, getQuizByCode } = require("../controllers/quizController");
const auth = require("../middleware/authMiddleware");

// 🔐 Teacher route: Create a quiz (must be logged in)
router.post("/create", auth, createQuiz);

// 🔓 Student route: Fetch a quiz by code (no login required)
router.get("/:code", getQuizByCode);

module.exports = router;
const {
  createQuiz,
  getQuizByCode,
  submitQuiz,
  getScoreboard,
} = require("../controllers/quizController");

// Existing routes...
router.post("/create", auth, createQuiz);
router.get("/:code", getQuizByCode);

// 🆕 Add these below:
router.post("/submit", auth, submitQuiz); // or public if you want
router.get("/scoreboard/:id", getScoreboard);
