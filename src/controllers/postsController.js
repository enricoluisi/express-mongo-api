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
