// Importing the 'fs' module for file system operations (used for renaming the uploaded image file)
import fs from "fs";
// Importing model functions to interact with the posts data in the database
import { getAllPosts, createPost, updatePost } from "../models/postsModel.js";
// Importing the function to integrate with the Gemini API for generating descriptions
import generateDescriptionWithGemini from "../services/geminiService.js";

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

// The 'updateNewPost' function handles the logic for updating an existing post
// It responds to the PUT request on the '/upload/:id' route
export async function updateNewPost(req, res) {
    const id = req.params.id;  // Extracting the post ID from the route parameters
    const urlImage = `http://localhost:3000/${id}.png`;  // Creating the URL for the updated image
    try {
        // Read the image file from the 'uploads' directory based on the post ID
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        
        // Generate a description for the image using the Gemini API
        const description = await generateDescriptionWithGemini(imgBuffer);

        // Create a post object with the updated information
        const post = {
            imgUrl: urlImage,  // The new image URL to associate with the post
            description: description, // The generated description of the image
            alt: req.body.alt  // The updated alt text for the image
        };

        // Call the 'updatePost' function from the model to update the post in the database
        const createdPost = await updatePost(id, post);
        
        // Return the updated post as a JSON response with a 200 OK status
        res.status(200).json(createdPost);
    } catch (error) {
        // Log any errors to the console for debugging purposes
        console.error(error.message);
        
        // Return a 500 Internal Server Error response with an error message in JSON format
        res.status(500).json({ "Error": "Request failed" });
    }
}
