const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, "Question text is required"],
  },
  options: {
    type: [String],
    validate: {
      validator: (arr) => arr.length >= 2,
      message: "At least 2 options are required",
    },
    required: true,
  },
  correctAnswer: {
    type: String,
    required: [true, "Correct answer is required"],
  },
});

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Quiz title is required"],
  },
  description: {
    type: String,
    default: "",
  },
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true,
  },
  questions: {
    type: [questionSchema],
    validate: {
      validator: (arr) => arr.length > 0,
      message: "A quiz must have at least one question",
    },
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Quiz", quizSchema);
