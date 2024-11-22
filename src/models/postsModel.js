import connectToDatabase from "../config/dbConfig.js";

// Establishing the database connection using the function from dbConfig.js
// The connection string is retrieved from the environment variable `STRING_CONNECTION`
const connection = await connectToDatabase(process.env.STRING_CONNECTION);

// This function fetches all posts from the MongoDB database
// It is called by the controller to retrieve data from the "posts" collection
export async function getAllPosts() {
    // Connect to the "backend-db" database and access the "posts" collection
    const db = connection.db("backend-db");
    const collection = db.collection("posts");
    
    // Retrieve all documents from the collection as an array and return it
    return collection.find().toArray();
}

// This function adds a new post to the MongoDB database
// It is called by the controller to insert data into the "posts" collection
export async function createPost(newPost) {
    // Connect to the "backend-db" database and access the "posts" collection
    const db = connection.db("backend-db");
    const collection = db.collection("posts");

    // Insert the new post object into the collection and return the result
    return collection.insertOne(newPost);
}