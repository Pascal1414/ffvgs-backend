// Imports Express
const express = require("express");
const mysql = require("mysql");
require("dotenv").config();

// Initialize Express app
const app = express();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to database");
});

app.use(express.json());

app.use("/programms/:id", (req, res, next) => {
  const { id } = req.params;
  const sql = "SELECT * FROM Programms WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      return res.status(404).json({ message: "Program not found" });
    }
    req.program = results[0];
    next();
  });
});

app.get("/", (req, res) => {
  res.send("This is the backend for ffvgs.ch");
});

// Programms
// Create a new program
app.post("/programms", (req, res) => {
  const { name, description } = req.body;
  if (!name || name === null || !description || description === null) {
    return res
      .status(400)
      .json({ message: "Name and description are required" });
  }
  const sql = "INSERT INTO Programms (name, description) VALUES (?, ?)";
  db.query(sql, [name, description], (err, result) => {
    if (err) throw err;
    res.json({ message: "Program created successfully", id: result.insertId });
  });
});

// Get all programs
app.get("/programms", (req, res) => {
  const sql = "SELECT * FROM Programms";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Get Single program by ID
app.get("/programms/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM Programms WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.send(result[0]);
    } else {
      res.status(404);
      res.send("Not found");
    }
  });
});

// Update a program by ID
app.put("/programms/:id", (req, res) => {
  const { name, description } = req.body;
  console.log(name, description);
  if (!name || name === null || !description || description === null) {
    return res
      .status(400)
      .json({ message: "Name and description is required for update" })
      .send();
  }
  const { id } = req.params;
  const sql = "UPDATE Programms SET name = ?, description = ? WHERE id = ?";
  db.query(sql, [name, description, id], (err) => {
    if (err) throw err;
    res.json({ message: "Program updated successfully", id });
  });
});

// Delete a program by ID
app.delete("/programms/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM Programms WHERE id = ?";
  db.query(sql, [id], (err) => {
    if (err) throw err;
    res.json({ message: "Program deleted successfully", id });
  });
});

// Users
app.get("/users", (req, res) => {
  db.query("SELECT id, username, lastlogin FROM Users", (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

const PORT = process.env.PORT || 3000;
// Listen for request
app.listen(PORT);
