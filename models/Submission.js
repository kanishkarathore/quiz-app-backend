const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  userAnswer: {
    type: String,
    default: null, // handles unanswered questions
  },
  correctAnswer: {
    type: String,
    required: true,
  },
}, { _id: false }); // prevents MongoDB from adding unnecessary _id fields in subdocs

const submissionSchema = new mongoose.Schema({
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false, // allow anonymous submissions if needed
  },
  answers: {
    type: [answerSchema],
    required: true,
    validate: {
      validator: arr => arr.length > 0,
      message: "At least one answer is required",
    },
  },
  score: {
    type: Number,
    required: true,
    min: 0,
  },
  total: {
    type: Number,
    required: true,
    min: 1,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Submission", submissionSchema);
