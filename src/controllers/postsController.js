import getAllPosts from "../models/postsModel.js";

// The 'listPosts' function handles the logic for fetching and returning posts
// It is responsible for responding to the GET request on the '/posts' route
export async function listPosts(req, res) {
    // Fetch all posts from the database by calling the 'getAllPosts' function from the model
    const posts = await getAllPosts();
    
    // Return the posts as a JSON response with a 200 OK status
    res.status(200).json(posts);
}