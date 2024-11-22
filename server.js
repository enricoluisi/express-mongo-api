import express from "express";
import routes from "./src/routes/postsRoutes.js";

// Create an instance of the express app
// Initialize an Express application
const app = express();

// Initialize routes by passing the Express app to the routes function
// The routes function defines all the API endpoints and their handlers
routes(app);

// Set up the server to listen on port 3000
// Start the server and log a message when it's listening
app.listen(3000, () => {
    console.log("Server listening...");
});