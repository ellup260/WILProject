Backend Working Report – Social Awareness Web Application
1. Introduction
The backend of the Social Awareness Web Application is built using Node.js with the Express.js framework for handling HTTP requests, and MySQL as the database for persistent storage. It follows a client–server model where the frontend (HTML, CSS, JS) sends requests to the backend, which processes them, interacts with the database, and returns the results to the client.
2. Backend Architecture
The backend is responsible for:
- Handling user requests (e.g., registration, login).
- Validating and processing input data.
- Querying and updating the MySQL database.
- Returning appropriate success or error messages to the frontend.

The backend code consists of:
1. Express server setup – Initializes the web server.
2. Middleware – Parses incoming request bodies in JSON format.
3. Database connection – Connects Node.js to MySQL.
4. API Endpoints – Defines routes such as /register and /login.
5. Server listening – Starts the server and listens for requests on a port.
 
3. Code Walkthrough
3.1 Server Setup
const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
3.2 Database Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "yourpassword",
    database: "social_awareness_db"
});

db.connect((err) => {
    if (err) throw err;
    console.log("MySQL connected...");
});
3.3 Registration Endpoint
app.post("/register", (req, res) => {
    const { username, password } = req.body;
    const query = "INSERT INTO users (full_name, password_hash) VALUES (?, ?)";

    db.query(query, [username, password], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ message: "User registered successfully" });
    });
});
3.4 Login Endpoint
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
3.5 Starting the Server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
4. Request–Response Flow
1. User Action – The user registers or logs in via the frontend form.
2. Frontend Request – A POST request is sent to the backend endpoint with form data.
3. Backend Processing – Express parses the request, runs SQL queries, and checks conditions.
4. Database Interaction – MySQL stores or verifies user data.
5. Response Sent – Backend sends a success/error JSON response to the frontend.
5. Security Considerations
Currently, passwords are stored in plain text. For better security:
- Use bcrypt.js to hash passwords before storing.
- Implement JWT (JSON Web Tokens) for secure authentication.
- Validate and sanitize inputs to prevent SQL Injection.
6. Conclusion
The backend integrates Node.js, Express, and MySQL to handle core functionalities like user registration and authentication. This structure allows scalability, modular development, and secure database handling for future features such as cause creation, event management, and user interaction.
ER Diagram Explanation
The Entity-Relationship (ER) diagram for the Social Awareness Web Application visually represents the database structure and relationships between its entities. Below is the breakdown:

1. **User Entity**: Stores user-related information such as `user_id` (Primary Key), `username`, and `password`. It manages authentication and authorization.
2. **Posts Entity**: Represents the social awareness posts created by users. It contains fields such as `post_id` (Primary Key), `title`, `description`, `created_at`, and a `user_id` (Foreign Key) to link the post to its creator.
3. **Comments Entity**: Stores user comments on posts, with fields `comment_id` (Primary Key), `content`, `created_at`, and foreign keys `post_id` and `user_id` linking comments to the post and commenter.
4. **Relationships**:
   - One-to-Many between **User** and **Posts**: A user can create many posts.
   - One-to-Many between **User** and **Comments**: A user can make many comments.
   - One-to-Many between **Posts** and **Comments**: A post can have multiple comments.

