const Submission = require("../models/Submission");
const Quiz = require("../models/Quiz");

// 📊 GET /api/scoreboard/:id — View your scoreboard
exports.getScoreboard = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);

    if (!submission) {
      return res.status(404).json({ msg: "Submission not found" });
    }

    // Only allow the student who submitted OR a teacher
    if (
      submission.student?.toString() !== req.user?.id &&
      req.user?.role !== "teacher"
    ) {
      return res.status(403).json({ msg: "Access denied to this scoreboard" });
    }

    res.status(200).json({
      score: submission.score,
      total: submission.total,
      answers: submission.answers,
    });
  } catch (err) {
    res.status(500).json({ msg: "Error fetching scoreboard", err });
  }
};

// 📥 GET /api/submissions/mine — View all submissions of logged-in student
exports.getMySubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({ student: req.user.id }).populate("quiz", "title code");

    res.status(200).json(submissions);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching your submissions", err });
  }
};

// 🧑‍🏫 GET /api/submissions/quiz/:quizId — Teacher: See all submissions for a quiz
exports.getSubmissionsByQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId);

    if (!quiz) return res.status(404).json({ msg: "Quiz not found" });

    // Only quiz creator (teacher) can view all its submissions
    if (quiz.createdBy.toString() !== req.user.id && req.user.role !== "teacher") {
      return res.status(403).json({ msg: "Not authorized to view submissions" });
    }

    const submissions = await Submission.find({ quiz: req.params.quizId })
      .populate("student", "name email");

    res.status(200).json(submissions);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching submissions", err });
  }
};
