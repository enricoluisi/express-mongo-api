import express from "express";
import connectToDatabase from "./src/config/dbConfig.js";

// Establishing the database connection using the function from dbConfig.js
// The connection string is retrieved from the environment variable `STRING_CONNECTION`
const connection = await connectToDatabase(process.env.STRING_CONNECTION)

// Create an instance of the express app
// Initialize an Express application
const app = express();

// Middleware to parse JSON data
// Use Express's built-in JSON parsing middleware
app.use(express.json());

// Set up the server to listen on port 3000
// Start the server and log a message when it's listening
app.listen(3000, () => {
    console.log("Server listening...");
});

async function getAllPosts() {
    // Connect to the "backend-db" database and access the "posts" collection
    const db = connection.db("backend-db")
    const collection = db.collection("posts")
    // Retrieve all documents from the collection as an array
    return collection.find().toArray()
}

// Define a GET route to return all the posts in JSON format
// When the client requests the /posts endpoint, return the list of all posts
app.get("/posts", async (req, res) => {
    const posts = await getAllPosts() // Fetch all posts from the database
    res.status(200).json(posts); // Return the posts as a JSON response
});