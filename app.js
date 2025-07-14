// 🔹 Imports
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// 🔹 Load environment variables
dotenv.config();

// 🔹 Initialize app & DB
const app = express();
connectDB();

// 🔹 Middleware
app.use(cors());
app.use(express.json()); // parse JSON request bodies

// 🔹 Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/quizzes", require("./routes/quizRoutes")); // ensure correct placement

// 🔹 Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
