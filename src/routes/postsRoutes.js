import express from "express";
import { listPosts } from "../controllers/postsController.js";

// Defining the routes for the application
// The function 'routes' takes the Express app as an argument and sets up the necessary routes
const routes = (app) => {
    // Middleware to parse JSON data
    // Use Express's built-in JSON parsing middleware to handle incoming JSON requests
    app.use(express.json());

    // Define a GET route to return all the posts in JSON format
    // When the client requests the /posts endpoint, return the list of all posts
    app.get("/posts", listPosts);  // Calls the listPosts function from the controller to handle the request
}

export default routes;  // Export the routes function for use in other parts of the application