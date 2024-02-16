// Imports Express
const express = require("express");
const mysql = require('mysql');
require("dotenv").config();

// Initialize Express app
const app = express();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

app.get("/", (req, res) => {
    res.send("This is the backend for ffvgs.ch");
});

// Programms
app.get("/programms", (req, res) => {
    db.query('SELECT * FROM programms', (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.get("/programms/:id", (req, res) => {
    db.query('SELECT * FROM programms WHERE id = ?', [req.params.id], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send(result[0]);
        } else {
            res.status(404);
            res.send('Not found');
        }
    });
});

// Users
app.get("/users", (req, res) => {
    db.query('SELECT id, username, lastlogin FROM users', (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});


const PORT = process.env.PORT || 3000;
// Listen for request
app.listen(PORT);