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

app.use("/programs/:id", (req, res, next) => {
  const { id } = req.params;
  const sql = "SELECT * FROM Programs WHERE id = ?";
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

// Programs
// Create a new program
app.post("/programs", (req, res) => {
  const { name, description } = req.body;
  if (!name || name === null || !description || description === null) {
    return res
      .status(400)
      .json({ message: "Name and description are required" });
  }
  const sql = "INSERT INTO Programs (name, description) VALUES (?, ?)";
  db.query(sql, [name, description], (err, result) => {
    if (err) throw err;
    res.json({ message: "Program created successfully", id: result.insertId });
  });
});

// Get all programs
app.get("/programs", (req, res) => {
  const sql =
    "SELECT p.id, p.name, p.description, d.date FROM Programs as p OUTER JOIN Dates as d ON p.id = d.program_id;";
  db.query(sql, (err, results) => {
    if (err) throw err;
    let formattedResults = [];
    results.forEach((result) => {
      const alreadyAddedItems = formattedResults.filter(
        (formattedResult) => formattedResult.id === result.id
      );
      if (alreadyAddedItems.length === 0) {
        formattedResults.push({
          id: result.id,
          name: result.name,
          description: result.description,
          dates: [],
        });
      } else {
        alreadyAddedItems[0].dates.push(result.date);
      }
    });
    res.send(formattedResults);
  });
});

// Get Single program by ID
app.get("/programs/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM Programs WHERE id = ?";
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
app.put("/programs/:id", (req, res) => {
  const { name, description } = req.body;
  if (!name || name === null || !description || description === null) {
    return res
      .status(400)
      .json({ message: "Name and description is required for update" })
      .send();
  }
  const { id } = req.params;
  const sql = "UPDATE Programs SET name = ?, description = ? WHERE id = ?";
  db.query(sql, [name, description, id], (err) => {
    if (err) throw err;
    res.json({ message: "Program updated successfully", id });
  });
});

// Delete a program by ID
app.delete("/programs/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM Programs WHERE id = ?";
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
