const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Save user to a txt file
const saveUserToFile = (userData) => {
  const filePath = path.join(__dirname, "users.txt");
  const entry = `${JSON.stringify(userData)}\n`;

  fs.appendFile(filePath, entry, (err) => {
    if (err) {
      console.error("Error writing to users.txt:", err);
    } else {
      console.log("User saved to users.txt");
    }
  });
};

// Registration endpoint
app.post("/api/register", (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!email || !email.includes("@")) {
    return res.status(400).json({ message: "Invalid email format." });
  }

  if (!password || password.length < 8) {
    return res.status(400).json({
      message: "Password must be at least 8 characters.",
    });
  }

  if (!phone || phone.length !== 10) {
    return res.status(400).json({
      message: "Phone must be exactly 10 digits.",
    });
  }

  const userData = { name, email, password, phone, timestamp: new Date() };

  // Save to users.txt
  saveUserToFile(userData);

  return res.status(200).json({ message: `Registration successful for ${name}!` });
});

// Login endpoint (optional)
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  if (email === "test@ibm.com" && password === "Test@123") {
    return res.json({ message: "Login successful." });
  }
  res.status(401).json({ message: "Invalid credentials." });
});

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
