Chatbot Documentation
Table of Contents
Introduction
Installation
Usage
Configuration
File Structure
Dependencies








Introduction
The Chatbot is a simple web application that utilizes Socket.IO and the OpenAI GPT-3.5 Turbo model to provide chat-based conversation capabilities. Users can interact with the chatbot by sending messages, and the chatbot responds based on the processed input.
The Chatbot is a sophisticated conversational agent designed to provide users with an interactive and dynamic chatting experience. Leveraging advanced technologies such as Socket.IO for real-time communication and the OpenAI GPT-3.5 Turbo model for natural language processing, the chatbot engages in meaningful and context-aware conversations.
Key Features
Real-time Interaction: The chatbot enables users to engage in seamless, real-time conversations, responding promptly to user inputs.
OpenAI Integration: Powered by the OpenAI GPT-3.5 Turbo model, the chatbot exhibits advanced language understanding, allowing for nuanced and contextually relevant responses.
Scalable Architecture: Built on a scalable architecture, the chatbot can handle multiple users concurrently, ensuring a smooth and responsive user experience.
User and Bot Message Logging: The chatbot logs both user and bot messages to a MongoDB database, facilitating conversation history tracking and analysis.
Use Cases
Customer Support: Implement the chatbot as part of a customer support system to assist users with common queries and concerns.
Interactive Assistance: Integrate the chatbot into applications to provide interactive guidance, information, or support.
Educational Platforms: Utilize the chatbot to create interactive learning environments, offering users a conversational approach to learning.
Installation
Clone the repository to your local machine:
git clone https://github.com/your-username/chatbot.git

Install the necessary dependencies:
npm install

Set up your OpenAI API key.
Create a .env  file in the project root and add your OpenAI API key:
OPENAI_API_KEY=your-api-key-goes-here











Usage
Start the server:
npm start
Open your web browser and navigate to http://localhost/3000 to access the chatbot interface.
Interact with the chatbot by typing messages in the input box and pressing Enter.











Configuration
OpenAI API Key
Ensure that your OpenAI API key is correctly set in the .env file:
OPENAI_API_KEY=your-api-key-goes-here

Port Configuration
By default, the server runs on port 3000. If you need to change the port, modify the Port variable in the server.js file.









File structure
1. index.html:
File Purpose: Main HTML file for the Chatbot App.
Structure:
Standard HTML5 document structure.
External stylesheets and scripts.
Utilizes Google Fonts for Poppins font.
Imports jQuery and Socket.IO scripts.
Links to the main script.js file.
2. style.css:
File Purpose: Defines styles for the Chatbot App.
Key Features:
Uses the Poppins font.
Responsive design for the chatbox.
Material Design icons for chatbot-toggler.
Media queries for responsive design.
3. script.js:
File Purpose: Handles client-side logic for the Chatbot App.
Key Features:
Toggles chatbox visibility.
Dynamically adjusts chat input height.
Sends and receives messages via Socket.IO.
Simulates OpenAI API response.
Utilizes jQuery and Socket.IO scripts.
4. server.js:
File Purpose: Sets up the server for the Chatbot App.
Key Features:
Connects to MongoDB for message storage.
Implements Socket.IO events for user messages and bot replies.
Integrates with OpenAI API (currently commented out).
Uses Express for routing.
5. package.json:
File Purpose: Lists project dependencies and scripts.
Key Dependencies:
Express: Web framework for Node.js.
Socket.IO: Real-time communication library.
Mongoose: MongoDB object modeling.
Axios: HTTP client for making API requests.
OpenAI: Library for interacting with the OpenAI API.
6. Model/message.js:
File Purpose: defines the structure and schema for messages, including user inputs and bot responses.
Key Dependencies:
Mongoose
MongoDB












Dependencies
Express
Socket.IO
Mongoose
Axios
OpenAI




# ChatBot
