const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize with your API key
const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateResponse(chatHistory) {
    try {
        const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });
        // const result = await model.generateContent(chatHistory);
        const result = await model.generateContent({
            contents: chatHistory,
        });

        const text = result.response.text();
        return text;
    } catch (error) {
        console.error("Error generating response:", error);
    }
}

module.exports = generateResponse;
