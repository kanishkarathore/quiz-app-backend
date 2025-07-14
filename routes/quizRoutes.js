const express = require("express");
const router = express.Router();

const {
  createQuiz,
  getQuizByCode,
  submitQuiz,
  getScoreboard,
} = require("../controllers/quizController");

const auth = require("../middleware/authMiddleware");

/**
 * @route   POST /api/quizzes/create
 * @desc    Create a new quiz (only for teachers)
 * @access  Private
 */
router.post("/create", auth, createQuiz);

/**
 * @route   GET /api/quizzes/:code
 * @desc    Fetch quiz details by code
 * @access  Public
 */
router.get("/:code", getQuizByCode);

/**
 * @route   POST /api/quizzes/submit
 * @desc    Submit quiz answers
 * @access  Private (or public if anonymous is allowed)
 */
router.post("/submit", auth, submitQuiz);

/**
 * @route   GET /api/quizzes/scoreboard/:id
 * @desc    Get scoreboard data for a quiz submission
 * @access  Private
 */
router.get("/scoreboard/:id", auth, getScoreboard);

module.exports = router;
