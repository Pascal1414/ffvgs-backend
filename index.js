// Imports Express
const express = require("express");

// Initialize Express app
const app = express();
const mysql = require('mysql');

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});
console.log(process.env.DB_HOST);
/*
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});*/

// Routes
app.get("/", (req, res) => {
    res.send("Hello World");
});


const PORT = process.env.PORT || 3000;
// Listen for request
app.listen(PORT);