// Importing the express module to create the routes
import express from "express";
// Importing the multer module to handle file uploads
import multer from "multer";
// Importing controller functions for handling the logic of the routes
import { listPosts, postNewPost, uploadImage, updateNewPost } from "../controllers/postsController.js";
// Importing the CORS module to enable cross-origin requests
import cors from "cors";

// Defining the CORS options to allow requests from the specified origin
const corsOptions = {
    origin: "http://localhost:8000", // Allow requests from this origin
    optionsSuccessStatus: 200       // Respond with a 200 status for successful preflight requests
};

// Configuring multer for file storage
// Define the storage engine for handling uploaded files
const storage = multer.diskStorage({
    // The destination where uploaded files will be stored
    destination: function (req, file, cb) {
        cb(null, "uploads/");  // Files will be stored in the 'uploads' directory
    },
    // The filename for the uploaded file
    filename: function (req, file, cb) {
        cb(null, file.originalname);  // Retain the original name of the file
    }
});

// Creating the multer upload instance with the defined storage configuration
const upload = multer({ storage });

// Defining the routes for the application
// The function 'routes' takes the Express app as an argument and sets up the necessary routes
const routes = (app) => {
    // Middleware to parse JSON data
    // Use Express's built-in JSON parsing middleware to handle incoming JSON requests
    app.use(express.json());
    // Middleware to handle cross-origin requests
    app.use(cors(corsOptions));

    // Define a GET route to return all the posts in JSON format
    // When the client requests the /posts endpoint, return the list of all posts
    app.get("/posts", listPosts);  // Calls the listPosts function from the controller to handle the request

    // Define a POST route to create a new post
    // When the client sends a POST request to the /posts endpoint, create a new post
    app.post("/posts", postNewPost);  // Calls the postNewPost function from the controller to handle the request

    // Define a POST route for uploading an image
    // When the client sends an image to the /upload endpoint, the image is uploaded and processed
    app.post("/upload", upload.single("image"), uploadImage); // Calls the uploadImage function from the controller and uses multer to handle the upload

    // Define a PUT route to update an existing post
    // When the client sends a PUT request to the /upload/:id endpoint, the post is updated with the uploaded image and its details
    app.put("/upload/:id", updateNewPost); // Calls the updateNewPost function from the controller to handle the request
}

// Exporting the routes function for use in other parts of the application
export default routes;
