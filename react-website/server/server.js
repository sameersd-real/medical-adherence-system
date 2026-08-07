const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const URI = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(express.json());

//mongoose connection
mongoose
  .connect(URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Routes
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

const User = require("./models/User");

// Create User
app.post("/api/users", async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

// Get Users
app.get("/api/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

//listen
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
