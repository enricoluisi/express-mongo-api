import { MongoClient } from "mongodb";

export default async function connectToDatabase(connectionString) {
  let mongoClient;

  try {
      // Create a new MongoClient instance using the connection string
      mongoClient = new MongoClient(connectionString);
      
      // Log the connection attempt
      console.log("Connecting to the database cluster...");
      
      // Attempt to connect to the database
      await mongoClient.connect();
      
      // Log success once connected
      console.log("Successfully connected to MongoDB Atlas!!!");

      // Return the MongoClient instance after successful connection
      return mongoClient;
  } catch (error) {
      // Log any error that occurs during the connection attempt
      console.error("Database connection failed!!!", error);
      
      // Exit the process if connection fails
      process.exit();
  }
}
