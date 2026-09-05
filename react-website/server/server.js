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

app.use(express.static("../client"));


// ================================
// MongoDB Connection
// ================================

mongoose
  .connect(URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));
// ================================
// User Model
// ================================
const User = require("./models/User");
const MissedDose = require("./models/MissedDose");
const Alarm = require("./models/Alarm");
// ================================
// Home Route
// ================================

app.get("/", (req, res) => {
  res.send("Backend is running!");
});


// ================================
// SIGNUP
// ================================

app.post("/signup", async (req, res) => {
  try {
    const { name, phone, password } = req.body;

    // Check required fields
    if (!name ||!phone || !password) {
      return res.status(400).json({
        message: "Name, Phone and password are required.",
      });
    }

    // Check phone number
    if (!/^\d{10}$/.test(phone)) {
      return res.status(400).json({
        message: "Phone number must contain exactly 10 digits.",
      });
    }

    // Check password length
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must contain at least 6 characters.",
      });
    }

    // Check if phone already exists
    const existingUser = await User.findOne({ phone });

    if (existingUser) {
      return res.status(409).json({
        message: "Phone number is already registered.",
      });
    }

    // Create user
    const user = await User.create({
      name,
      phone,
      password,
    });

    res.status(201).json({
      message: "Account created successfully.",
      user: {
        id: user._id,
        phone: user.phone,
      },
    });

  } catch (error) {
    console.error("Signup Error:", error);
    
    res.status(500).json({
      message: "Failed to create account.",
    });
  }
});
// =================================
// Login
// =================================
app.post("/login", async (req, res) => {
  try {
    const { phone, password } = req.body;
    if (!phone || !password) {
      return res.status(400).json({
        message: "Phone and password are required"
      });
    }
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(401).json({
        message: "Invalid phone number or password"
      });
    }
    if (user.password !== password) {
      return res.status(401).json({
        message: "Invalid phone number or password"
      });
    }
    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error"
    });
  }
});
// ================================
// ADMIN - GET USERS - for fun 😏
// ================================

app.get("/api/admin/users", async (req, res) => {
  try {
    const users = await User.find();

    res.json(users);
  } catch (error) {
    console.error("Get Users Error:", error);

    res.status(500).json({
      message: "Failed to get users.",
    });
  }
});

// ================================
// MISSED DOSES
// ================================

app.get("/api/missed-doses", async (req, res) => {
  try {
    const { start, end, limit } = req.query;
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;

    if ((start && !datePattern.test(start)) || (end && !datePattern.test(end))) {
      return res.status(400).json({ message: "Dates must use YYYY-MM-DD format." });
    }

    if (start && end && start > end) {
      return res.status(400).json({ message: "start must be on or before end." });
    }

    const query = {};
    if (start || end) {
      query.scheduledDate = {};
      if (start) query.scheduledDate.$gte = start;
      if (end) query.scheduledDate.$lte = end;
    }

    const parsedLimit = Number.parseInt(limit, 10);
    const dosesQuery = MissedDose.find(query).sort({ scheduledDate: -1, scheduledTime: -1 });
    if (Number.isInteger(parsedLimit) && parsedLimit > 0) {
      dosesQuery.limit(Math.min(parsedLimit, 100));
    }

    const doses = await dosesQuery.lean();
    res.json(doses);
  } catch (error) {
    console.error("Get missed doses error:", error);
    res.status(500).json({ message: "Failed to get missed doses." });
  }
});

// ====================================
// Save alarm time
// ======================================================
app.post("/api/alarms", async (req, res) => {
    try {
        const { userId, medicine, time, tablets } = req.body;

        if (!userId || !time || !tablets) {
            return res.status(400).json({
                message: "All alarm fields are required"
            });
        }

        const alarm = await Alarm.create({
            userId,
            medicine,
            time,
            tablets
        });

        res.status(201).json(alarm);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to create alarm"
        });
    }
});
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
