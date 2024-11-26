import { GoogleGenerativeAI } from "@google/generative-ai";

// Instantiate the GoogleGenerativeAI class using the API key from environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Retrieve the generative model "gemini-1.5-flash" for generating content
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/**
 * Function to generate a description of an image using the Gemini API.
 * @param {Buffer} imageBuffer - The image data in buffer format.
 * @returns {string} - The generated description of the image or an alternative message if not available.
 */
export default async function generateDescriptionWithGemini(imageBuffer) {
    // Define the prompt for the generative model
    const prompt = "Generate a description for the following image";

    try {
        // Format the image data to include its base64 string and MIME type
        const image = {
            inlineData: {
                data: imageBuffer.toString("base64"), // Convert image buffer to base64 string
                mimeType: "image/png",               // Specify the image format
            },
        };

        // Send the prompt and image to the generative model to generate content
        const res = await model.generateContent([prompt, image]);

        // Return the generated text or a fallback message if no text is returned
        return res.response.text() || "Alt-text not available.";
    } catch (error) {
        // Log the error details for debugging purposes
        console.error("Error while retrieving alt-text:", error.message, error);

        // Throw a new error to propagate the issue up the call stack
        throw new Error("Error retrieving alt-text from Gemini.");
    }
}
