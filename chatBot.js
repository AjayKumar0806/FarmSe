// Simple chatbot functionality with alternative prompts
const responses = {
    "How to register as a farmer?": [
        "You can go to our 'Farmer Registration' page.",
        ["How do I register as a farmer?", "Farmer registration process", "Register as a farmer", "Sign up as a farmer"]
    ],
    "How to get weather information?": [
        "You can visit our 'Weather' page.",
        ["Weather information", "Check weather", "Get weather updates", "Weather forecast"]
    ],
    "What are the product categories?": [
        "We have several product categories. Please check the 'Product Categories' page.",
        ["Product categories", "Types of products", "Available categories", "What products can I find?"]
    ],
    // New agribusiness-related prompts with alternatives
    "How to sell my produce?": [
        "You can sell your produce by listing it on our platform under 'Sell Produce'.",
        ["Sell my crops", "List produce for sale", "Where can I sell my produce?", "Sell farm produce"]
    ],
    "Where can I find market prices?": [
        "Market prices are available in the 'Price Prediction' section.",
        ["Check market prices", "Current crop prices", "Find market rates", "Price prediction"]
    ],
    // ... (other prompts with alternative phrases) ...

    // Default response
    "default": "I'm sorry, I didn't understand that. I'm here to help with agribusiness-related queries like crop advice, market prices, weather updates, and more. Please try rephrasing your question or ask about another topic!"
};

// Function to find response for a given message
function getResponse(message) {
    for (const [key, response] of Object.entries(responses)) {
        if (Array.isArray(response) && response.length > 1) {
            const [botResponse, alternatives] = response;
            if (message === key || alternatives.some(alt => alt.toLowerCase() === message.toLowerCase())) {
                return botResponse;
            }
        } else if (message === key) {
            return response;
        }
    }
    return responses["default"]; // Return default response if no match found
}

document.getElementById('sendMessageBtn').addEventListener('click', function() {
    const userMessage = document.getElementById('userMessage').value;
    const chatbox = document.getElementById('chatbox');

    if (userMessage) {
        chatbox.innerHTML += `<div><strong>You:</strong> ${userMessage}</div>`;
        document.getElementById('userMessage').value = '';

        // Get the bot response based on user message
        const botResponse = getResponse(userMessage);
        chatbox.innerHTML += `<div><strong>Bot:</strong> ${botResponse}</div>`;

        // Simulate speech output
        const speech = new SpeechSynthesisUtterance(botResponse);
        speech.lang = 'en-IN'; // Set language to English
        window.speechSynthesis.speak(speech);

        chatbox.scrollTop = chatbox.scrollHeight; // Scroll to the bottom
    }
});
