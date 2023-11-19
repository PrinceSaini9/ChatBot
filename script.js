// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Select necessary DOM elements
    const chatbotToggler = document.querySelector(".chatbot-toggler");
    const closeBtn = document.querySelector(".close-btn");
    const chatbox = document.querySelector(".chatbox");
    const chatInput = document.querySelector(".chat-input textarea");
    const sendChatBtn = document.querySelector(".chat-input span");
  
    // Initialize variables
    let userMessage = null;
    const inputInitHeight = chatInput.scrollHeight;
  
    // Function to create a chat message element
    const createChatLi = (message, className) => {
      const chatLi = document.createElement("li");
      chatLi.classList.add("chat", `${className}`);
      let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
      chatLi.innerHTML = chatContent;
      chatLi.querySelector("p").textContent = message;
      return chatLi;
    };
  
    // Set up Socket.IO connection
    const socket = io();
    socket.on('connect', () => {
      console.log('Connected to Socket.io server');
    });
  
    // Initialize botReply variable
    let botReply;
  
    // Listen for 'bot reply' events from the server
    socket.on('bot reply', (reply) => {
      botReply = reply;
      // Find the thinking message and update its content
      const thinkingMessage = document.querySelector(".chatbox .incoming p");
      if (thinkingMessage && thinkingMessage.textContent.includes('Thinking...')) {
        thinkingMessage.textContent = botReply.content.trim();
      }
      // Generate response with the received botReply
      generateResponse(botReply);
    });
  
    // Function to generate a response and update the UI
    const generateResponse = (chatElement) => {
      // Simulate the OpenAI API response (replace with actual API call)
      if (botReply) {
        const incomingChatLi = createChatLi(botReply.content, "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        chatElement.content = botReply.content.trim();
      } else {
        console.log("Bot reply not available.");
      }
    };
  
    // Function to handle user input
    const handleChat = () => {
      userMessage = chatInput.value.trim();
      if (!userMessage) return;
  
      // Clear input and adjust input height
      chatInput.value = "";
      chatInput.style.height = `${inputInitHeight}px`;
  
      // Append outgoing message to the chatbox
      chatbox.appendChild(createChatLi(userMessage, "outgoing"));
      chatbox.scrollTo(0, chatbox.scrollHeight);
  
      // Emit 'chat message' event to the server with the user's message
      socket.emit('chat message', userMessage);
    };
  
    // Adjust input height dynamically
    chatInput.addEventListener("input", () => {
      chatInput.style.height = `${inputInitHeight}px`;
      chatInput.style.height = `${chatInput.scrollHeight}px`;
    });
  
    // Handle Enter key press to send the message
    chatInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
      }
    });
  
    // Handle click on the send button
    sendChatBtn.addEventListener("click", handleChat);
  
    // Handle click on the close button
    closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
  
    // Handle click on the chatbot toggler button
    chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
  });