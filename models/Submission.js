const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false, // optional if anonymous
  },
  answers: [
    {
      question: String,
      userAnswer: String,
      correctAnswer: String,
    },
  ],
  score: Number,
  total: Number,
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Submission", submissionSchema);
