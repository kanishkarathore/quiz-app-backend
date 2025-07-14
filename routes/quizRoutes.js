const express = require("express");
const router = express.Router();

const {
  createQuiz,
  getQuizByCode,
  submitQuiz,
  getScoreboard,
} = require("../controllers/quizController");

const auth = require("../middleware/authMiddleware");

// 🔐 Teacher route: Create a quiz (must be logged in)
router.post("/create", auth, createQuiz);

// 🔓 Student route: Fetch a quiz by code (no login required)
router.get("/:code", getQuizByCode);

// ✅ Student route: Submit quiz answers (auth optional — change as needed)
router.post("/submit", auth, submitQuiz);

// 📊 Teacher route: Get scoreboard for a quiz
router.get("/scoreboard/:id", getScoreboard);

module.exports = router;
