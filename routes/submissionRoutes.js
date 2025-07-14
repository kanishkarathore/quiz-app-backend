const express = require("express");
const router = express.Router();

const {
  submitQuiz,
  getScoreboard
} = require("../controllers/quizController"); // Still using logic from quizController

const auth = require("../middleware/authMiddleware");

/**
 * @route   POST /api/submissions/submit
 * @desc    Submit quiz answers
 * @access  Private (can be changed to public for anonymous quiz)
 */
router.post("/submit", auth, submitQuiz);

/**
 * @route   GET /api/submissions/:id
 * @desc    Get scoreboard by submission ID
 * @access  Private
 */
router.get("/:id", auth, getScoreboard);

module.exports = router;
