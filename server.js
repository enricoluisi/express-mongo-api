// Importing the express module to create the server and routes
import express from "express";
// Importing the routes for posts defined in the postsRoutes.js file
import routes from "./src/routes/postsRoutes.js";

// Create an instance of the express app
// The Express application will manage the routes and serve static files
const app = express();

// Set up Express to serve static files from the 'uploads' folder.
// This allows files inside this folder to be accessed directly via URL.
app.use(express.static("uploads"));

// Initialize the routes, passing the Express app instance to the routes file.
// This ensures all the routes are properly configured.
routes(app);

// Set up the server to listen on port 3000
// The server will wait for HTTP requests on port 3000.
// Once it starts, a message will be logged to the console indicating the server is up.
app.listen(3000, () => {
    console.log("Server listening...");
});
