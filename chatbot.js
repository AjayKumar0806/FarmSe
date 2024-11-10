document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("input");
  
    // Show default greeting message when the chatbot loads
    displayDefaultMessage();
  
    // Load suggested prompts on page load
    displaySuggestedPrompts();
  
    // Send message on Enter key press
    inputField.addEventListener("keydown", (e) => {
      if (e.code === "Enter") {
        let input = inputField.value;
        inputField.value = "";
        output(input);
      }
    });
  });
  
  // Display default greeting message on page load
  function displayDefaultMessage() {
    const messagesContainer = document.getElementById("messages");
    
    let botDiv = document.createElement("div");
    let botImg = document.createElement("img");
    let botText = document.createElement("span");
    
    botDiv.id = "bot";
    botImg.src = "images/bot-mini.png";
    botImg.className = "avatar";
    botDiv.className = "bot response";
    botText.innerText = "Hello! I'm FarmMate, your assistant for the Agribusiness Portal. How can I assist you today?'";
    
    botDiv.appendChild(botText);
    botDiv.appendChild(botImg);
    messagesContainer.appendChild(botDiv);
  }
  
  // Display suggested prompts on the page
  function displaySuggestedPrompts() {
    const promptContainer = document.getElementById("prompts-list");
  
    prompts.forEach((promptGroup) => {
      promptGroup.forEach((prompt) => {
        const promptElement = document.createElement("div");
        promptElement.className = "suggestion";
        promptElement.innerText = prompt;
        promptElement.onclick = () => {
          document.getElementById("input").value = prompt;
          output(prompt);
        };
        promptContainer.appendChild(promptElement);
      });
    });
  }
  
  function output(input) {
    let product;
  
    // Clean up the input
    let text = input.toLowerCase().replace(/[^\w\s]/gi, "").replace(/[\d]/gi, "").trim();
    text = text
      .replace(/ a /g, " ")
      .replace(/i feel /g, "")
      .replace(/whats/g, "what is")
      .replace(/please /g, "")
      .replace(/ please/g, "")
      .replace(/r u/g, "are you");
  
    if (compare(prompts, replies, text)) { 
      product = compare(prompts, replies, text);
    } else if (text.match(/thank/gi)) {
      product = "You're welcome!";
    } else if (text.match(/(hello|hi|hey|greetings|good morning|good afternoon|good evening|good night|what's up)/gi)) {
      product = getGreetingResponse(text);
    } else if (text.match(/what is your name|who are you|introduce yourself/i)) {
      product = "I am FarmMate, your virtual assistant for the Agribusiness Portal. I'm here to help you with questions related to registration, product management, market updates, and more!";
    } else {
      product = alternative[Math.floor(Math.random() * alternative.length)];
    }
  
    addChat(input, product);
  }
  
  function compare(promptsArray, repliesArray, string) {
    let reply;
    let replyFound = false;
    for (let x = 0; x < promptsArray.length; x++) {
      for (let y = 0; y < promptsArray[x].length; y++) {
        if (promptsArray[x][y] === string) {
          let replies = repliesArray[x];
          reply = replies[Math.floor(Math.random() * replies.length)];
          replyFound = true;
          break;
        }
      }
      if (replyFound) break;
    }
    return reply;
  }
  
  function getGreetingResponse(text) {
    if (text.match(/good morning/i)) {
      return "Good morning! How can I help you today?";
    } else if (text.match(/good afternoon/i)) {
      return "Good afternoon! What can I assist you with?";
    } else if (text.match(/good evening/i)) {
      return "Good evening! How can I help you tonight?";
    } else if (text.match(/good night/i)) {
      return "Good night! Feel free to ask if you need anything before you sleep.";
    } else {
      return "Hello! How can I assist you today?";
    }
  }
  
  function addChat(input, product) {
    const messagesContainer = document.getElementById("messages");
  
    let userDiv = document.createElement("div");
    userDiv.id = "user";
    userDiv.className = "user response";
    userDiv.innerHTML = `<img src="images/user.png" class="avatar"><span>${input}</span>`;
    messagesContainer.appendChild(userDiv);
  
    let botDiv = document.createElement("div");
    let botImg = document.createElement("img");
    let botText = document.createElement("span");
    botDiv.id = "bot";
    botImg.src = "images/bot-mini.png";
    botImg.className = "avatar";
    botDiv.className = "bot response";
    botText.innerText = "Typing...";
    botDiv.appendChild(botText);
    botDiv.appendChild(botImg);
    messagesContainer.appendChild(botDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.clientHeight;
  
    setTimeout(() => {
      botText.innerText = `${product}`;
      textToSpeech(product);
    }, 2000);
  }
  
  // Optional: Add a text-to-speech function
  function textToSpeech(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
    
  }
  
  
  // Predefined prompts and replies for farmer and buyer website
  const prompts = [
    ["sign up", "how can I sign up", "register"],
    ["login", "what do I need to log in"],
    ["manage products", "how can I manage my products"],
    ["weather", "how is the weather", "weather forecast"],
    ["price prediction", "how does the price prediction work"],
    ["track orders", "how can I track my orders"],
    ["market updates", "how can I get market updates"],
    ["crop guidance", "can you help with crop management"],
    ["forgot password", "what if I forget my password"],
    
    // New prompts
    ["dashboard", "what can I do on my dashboard", "show me my dashboard"],
    ["order history", "how can I view my order history"],
    ["product categorization", "how do I categorize my products"],
    ["real-time communication", "how can I communicate with buyers"],
    ["weather alerts", "can I receive weather alerts"],
    ["price alerts", "how do I set up price alerts"],
    ["user roles", "what are the different user roles on the platform"],
    ["system security", "how is my data protected"],
    ["features", "what features does the platform offer"],
    ["crop recommendations", "can you recommend crops for my area"]
  ];
  
  const replies = [
    ["You can sign up by providing your name, email, and contact information on the registration page.", "To sign up, fill in the necessary details on the registration page."],
    ["You need your registered email and password to log in on the login page.", "Log in using your email and password on the login page."],
    ["You can manage your products through the product management module in your dashboard.", "The product management module allows you to efficiently manage your offerings."],
    ["The portal provides localized weather updates tailored to your specific location. Check the weather page for more information.", "You can access weather forecasts for your area on the weather page."],
    ["The price prediction feature provides real-time updates based on market conditions. Visit the price prediction page to learn more.", "You will receive dynamic pricing updates on the price prediction page."],
    ["You can track your orders through the order management section of your dashboard.", "Buyers can view their order status easily in the order tracking page."],
    ["You can receive market updates through notifications sent to your dashboard.", "Stay updated with the latest market trends in the market updates page."],
    ["Yes, the chatbot can assist you with crop management queries. Visit the crop guidance page for more help.", "Feel free to ask for specific crop-related advice on the crop guidance page."],
    ["If you forget your password, you can use the 'forgot password' option to recover your account on the forgot password page.", "Follow the prompts to reset your password via email on the forgot password page."],
    
    // New replies
    ["You can access your dashboard for managing your account, products, and orders.", "Your dashboard provides an overview of your recent activities."],
    ["To view your order history, go to the order history page.", "You can find your past orders listed in the order history page."],
    ["Categorize your products by selecting the relevant categories in the product management section.", "You can easily categorize products during the uploading process."],
    ["You can communicate with buyers through the messaging feature in your dashboard.", "Real-time communication with buyers is enabled through the platform's messaging tools."],
    ["Yes, you can set up weather alerts based on your location preferences in the weather page.", "The system can send weather alerts to keep you updated."],
    ["Price alerts can be set up on the price alerts page to notify you of market changes.", "You will receive alerts for significant price changes."],
    ["Different user roles include farmers, buyers, and service providers, each with unique features.", "The platform supports various roles to cater to different user needs."],
    ["Your data is protected through secure authentication and data encryption methods.", "We prioritize your security by implementing advanced security protocols."],
    ["The platform offers features such as product management, weather forecasts, and price predictions.", "Explore various features designed to enhance your agribusiness experience."],
    ["We can recommend suitable crops based on your location and market demand.", "Our system provides crop recommendations tailored to your farming conditions."]
];

  
  const alternative = [
    "I'm here to help! Could you clarify your question?", 
    "I'm not sure I understand. Could you rephrase?", 
    "Let's try that again. Could you ask in a different way?", 
  ];
  