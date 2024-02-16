const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const multer = require("multer");

const app = express();
const PORT = process.env.PORT || 3000;

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Multer upload configuration
const upload = multer({ storage: storage });

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, images, etc.)
app.use(express.static(path.join(__dirname, "public")));

// Login route
app.post("/login", (req, res) => {
  // Here you can implement your login logic
  const { username, password } = req.body;

  // Dummy authentication for demonstration purposes
  if (username === "your_username" && password === "your_password") {
    res.redirect("/home.html"); // Redirect to home.html on successful login
  } else {
    res.send("Invalid credentials"); // Handle invalid login
  }
});

// Assignment submission route
app.post("/submit-assignment", upload.array("folder", 1), (req, res) => {
  // Here you can handle the assignment submission
  // Access form data using req.body and req.files and process it accordingly
  const { name, email } = req.body;
  const folderFiles = req.files; // Array of uploaded files

  // Process the submission data as needed

  // For demonstration purposes, send a success response
  res.send("Assignment submitted successfully!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
