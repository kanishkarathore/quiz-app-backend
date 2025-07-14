const Quiz = require("../models/Quiz");
const Submission = require("../models/Submission");
const { nanoid } = require("nanoid");

// 🔐 POST /api/quizzes/create
exports.createQuiz = async (req, res) => {
  const { title, description, questions } = req.body;
  const userId = req.user.id;
  const role = req.user.role;

  if (role !== "teacher") {
    return res.status(403).json({ msg: "Only teachers can create quizzes" });
  }

  if (!title || !questions || questions.length === 0) {
    return res.status(400).json({ msg: "Title and questions are required" });
  }

  const code = nanoid(6).toUpperCase(); // Unique 6-character quiz code

  try {
    const quiz = new Quiz({
      title,
      description,
      code,
      questions,
      createdBy: userId,
    });

    await quiz.save();
    res.status(201).json({ msg: "Quiz created", code: quiz.code });
  } catch (err) {
    res.status(500).json({ msg: "Error creating quiz", err });
  }
};

// 🔓 GET /api/quizzes/:code
exports.getQuizByCode = async (req, res) => {
  const quizCode = req.params.code.toUpperCase(); // sanitize input

  try {
    const quiz = await Quiz.findOne({ code: quizCode }).select("-createdBy -__v");

    if (!quiz) {
      return res.status(404).json({ msg: "Quiz not found" });
    }

    res.status(200).json(quiz); // send quiz to frontend
  } catch (err) {
    res.status(500).json({ msg: "Server error", err });
  }
};

// 📝 POST /api/quizzes/submit
exports.submitQuiz = async (req, res) => {
  const { code, answers } = req.body;
  const quizCode = code.toUpperCase();

  try {
    const quiz = await Quiz.findOne({ code: quizCode });

    if (!quiz) return res.status(404).json({ msg: "Quiz not found" });

    const results = [];
    let score = 0;

    quiz.questions.forEach((q, index) => {
      const userAnswer = answers[index] || "";
      const isCorrect = q.correctAnswer === userAnswer;
      if (isCorrect) score++;

      results.push({
        question: q.question,
        userAnswer,
        correctAnswer: q.correctAnswer,
      });
    });

    const submission = new Submission({
      quiz: quiz._id,
      student: req.user?.id || null,
      answers: results,
      score,
      total: quiz.questions.length,
    });

    await submission.save();

    res.status(200).json({
      msg: "Submitted",
      score,
      total: quiz.questions.length,
      submissionId: submission._id,
    });
  } catch (err) {
    res.status(500).json({ msg: "Error during submission", err });
  }
};

// 📊 GET /api/scoreboard/:id
exports.getScoreboard = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);

    if (!submission) return res.status(404).json({ msg: "Submission not found" });

    res.status(200).json({
      score: submission.score,
      total: submission.total,
      answers: submission.answers,
    });
  } catch (err) {
    res.status(500).json({ msg: "Error loading scoreboard", err });
  }
};
