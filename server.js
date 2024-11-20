import express from "express";

// Array of posts with descriptions and images
// Defining an array of posts, each with an id, description, and an image URL
const posts = [
    { id: 1, description: "A test photo", image: "https://placecats.com/millie/300/150" },
    { id: 2, description: "Cat doing yoga", image: "https://placekitten.com/400/300" },
    { id: 3, description: "Sleeping kitten", image: "https://placekitten.com/350/250" },
    { id: 4, description: "Curious cat looking through the window", image: "https://placekitten.com/450/350" },
    { id: 5, description: "Kitten playing with a ball of yarn",  image: "https://placekitten.com/500/400" },
    { id: 6, description: "Black cat in the garden", image: "https://placekitten.com/550/300" },
    { id: 7, description: "Kitten with a funny hat", image: "https://placekitten.com/300/300" }
];

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

// Define a GET route to return all the posts in JSON format
// When the client requests the /posts endpoint, return the list of all posts
app.get("/posts", (req, res) => {
    res.status(200).json(posts);
});

// Function to search posts by ID
// Takes an ID and returns the index of the post with the matching ID
function searchPostsbyID(id) {
    return posts.findIndex((post) => {
        return post.id === Number(id)
    })
};

// Define a GET route to return a single post by its ID
// When the client requests the /posts/:id endpoint, return the post with the given ID
app.get("/posts/:id",(req, res) => {
    const index = searchPostsbyID(req.params.id) // Use the search function to find the post index
    res.status(200).json(posts[index]); // Return the post as JSON
});