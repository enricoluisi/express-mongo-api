// Import the express module, which makes it easier to create web servers
import express from "express";

// Create an instance of the Express application
const app = express();

// The server will listen on port 3000
app.listen(3000, () => {
    // Display a message in the console to confirm the server is running
    console.log("Server listening...");
});

// Create a GET route for the path "/api"
// When this route is accessed, the callback function will be executed
app.get("/api", (req, res) => {
    // Send a response with status 200 and a message
    res.status(200).send("Welcome, this server is working!!");
});