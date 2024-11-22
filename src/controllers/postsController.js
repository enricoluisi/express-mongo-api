import fs from "fs";
import { getAllPosts, createPost } from "../models/postsModel.js";

// The 'listPosts' function handles the logic for fetching and returning posts
// It is responsible for responding to the GET request on the '/posts' route
export async function listPosts(req, res) {
    // Fetch all posts from the database by calling the 'getAllPosts' function from the model
    const posts = await getAllPosts();
    
    // Return the posts as a JSON response with a 200 OK status
    res.status(200).json(posts);
}

// The 'postNewPost' function handles the logic for creating a new post
// It responds to the POST request on the '/posts' route
export async function postNewPost(req, res) {
    const newPost = req.body; // Retrieve the new post data from the request body
    try {
        // Call the 'createPost' function from the model to add the new post to the database
        const createdPost = await createPost(newPost);
        
        // Return the created post as a JSON response with a 200 OK status
        res.status(200).json(createdPost);
    } catch (error) {
        // Log any errors to the console for debugging purposes
        console.error(error.message);

        // Return a 500 Internal Server Error response with an error message in JSON format
        res.status(500).json({ "Error": "Request failed" });
    }
}

// The 'uploadImage' function handles the logic for uploading an image
// It responds to the POST request on the '/upload' route
export async function uploadImage(req, res) {
    // Creating a new post object with the image URL and other necessary information
    const newPost = {
        description: "", // Description of the image (empty for now)
        imgURL: req.file.originalname, // Storing the original filename of the uploaded image
        alt: "" // Alt text for the image (empty for now)
    };
    try {
        // Call the 'createPost' function from the model to add the new post with the image reference to the database
        const createdPost = await createPost(newPost);

        // Update the file path to save the image with a name based on the inserted post's ID
        const updatedImage = `uploads/${createdPost.insertedId}.png`;

        // Rename the uploaded image file to the new path with the updated file name
        fs.renameSync(req.file.path, updatedImage);

        // Return the created post as a JSON response with a 200 OK status
        res.status(200).json(createdPost);
    } catch (error) {
        // Log any errors to the console for debugging purposes
        console.error(error.message);

        // Return a 500 Internal Server Error response with an error message in JSON format
        res.status(500).json({ "Error": "Request failed" });
    }
}