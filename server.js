const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');   // <-- needed for serving HTML
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (CSS, JS)
app.use(express.static(__dirname));

// Database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "elson@123",
    database: "social_awareness_app"
});

db.connect((err) => {
    if(err){
        console.log("Error connecting to DB:", err);
    } else {
        console.log("Database connected!");
    }
});

// Serve HTML page at root
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Login endpoint
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    db.query(
        "SELECT * FROM users WHERE full_name = ? AND password_hash = ?",
        [username, password],
        (err, results) => {
            if (err) return res.status(500).send(err);
            if (results.length > 0) {
                res.send({ message: "Login successful" });
            } else {
                res.status(401).send({ message: "Invalid credentials" });
            }
        }
    );
});

// Registration endpoint
app.post("/register", (req, res) => {
    const { username, password } = req.body;
    db.query(
        "INSERT INTO users (full_name, email, password_hash) VALUES (?, ?, ?)",
        [username, username + "@example.com", password],
        (err, results) => {
            if (err) return res.status(500).send(err);
            res.send({ message: "User registered successfully!" });
        }
    );
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});