// Import necessary modules
require('dotenv').config();
const express = require('express');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const Message = require('./models/message'); // Assuming you have a Message model
const OpenAI = require('openai');
const openaiApiKey = process.env.OPENAI_API_KEY;

// Create an instance of OpenAI
const openai = new OpenAI({ apiKey: openaiApiKey });

// Create an Express application
const app = express();

// Create an HTTP server using Express app
const server = http.createServer(app);

// Set up Socket.IO with the server
const io = socketIo(server);

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/chatbot', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Handle MongoDB connection errors
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Set up basic route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Socket.io setup
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle incoming messages
  socket.on('chat message', async (msg) => {
    console.log('Received message from client:', msg);

    try {
      // Send user message to OpenAI API for processing
      const openaiResponse = await openai.chat.completions.create({
        messages: [{ role: 'user', content: msg }],
        model: 'gpt-3.5-turbo',
      });

      const botReply = openaiResponse.choices[0].message.content;

      // Save the user and bot messages to MongoDB
      const userMessage = new Message({ user: 'User', content: msg });
      const botMessage = new Message({ user: 'Chatbot', content: botReply });

      await userMessage.save();
      await botMessage.save();

      // Emit 'bot reply' event to the client with the bot's reply
      socket.emit('bot reply', { content: botReply });
    } catch (error) {
      console.error('Error processing chat message:', error.message);
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server on the specified port
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
