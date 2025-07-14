const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/authController");

// 🔐 Public Auth Routes
router.post("/register", register); // Register a new user
router.post("/login", login);       // Login and receive JWT

module.exports = router;
