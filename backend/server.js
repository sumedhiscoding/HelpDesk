// Importing required modules
const express = require("express");
const dotenv = require("dotenv").config();
const axios = require("axios");
const http=require("http");
const mongoose=require("mongoose");
const Message=require("./models/Message")
const socketIo = require('socket.io');
const cors=require("cors");
// Creating an Express application
const app = express();
const allowedOrigins = ['http://localhost:5173']; // Add the origin of your React app
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
}));
const port = 3000;
const server = http.createServer(app);
const io = socketIo(server,{
  cors: {
    origin: 'http://localhost:5173', // Add the origin of your React app
    methods: ['GET', 'POST'],
  },
});
const VERIFY_TOKEN = "token";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//mongoose connection
mongoose.connect('mongodb://localhost:27017/HelpDeskDb').then(()=>{
  console.log("sucessfully connected to MongoDB")
}).catch(err => console.log(err));

//websocket connection
io.on('connection', (socket) => {
  console.log('Client connected');

  // Send a welcome message to the client
  // socket.emit('message', 'Welcome to the WebSocket server');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

//webhooks
app.get("/webhook", (req, res) => {
  // Verifying the webhook
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("Webhook verified");
    res.status(200).send(challenge);
  } else {
    console.error("Verification failed. Make sure the verify token matches.");
    res.sendStatus(403);
  }
});

app.post('/webhook', async (req, res) => {
  const body = req.body;

  if (body.object === 'page') {
    const messagingEvents = body.entry[0].messaging;

    // Iterate through messaging events
    messagingEvents.forEach(async (event) => {
      const { sender, recipient, timestamp, message } = event;

      // Save the message to MongoDB using Mongoose
      const newMessage = new Message({
        senderId: sender.id,
        recipientId: recipient.id,
        timestamp,
        messageId: message.mid,
        messageText: message.text,
      });

      try {
        await newMessage.save();
        console.log('Message saved successfully');

        // Send the new message to all connected socket.io clients
        io.emit('message', {
          senderId: sender.id,
          recipientId: recipient.id,
          timestamp,
          messageId: message.mid,
          messageText: message.text,
        });
      } catch (error) {
        console.error('Error saving message:', error);
      }

      // Handle different types of events here
    });

    res.status(200).send('EVENT_RECEIVED');
  } else {
    res.sendStatus(404);
  }
});



app.get("/pageId&AT", async (req, res) => {
  const url = `${process.env.FACEBOOK_GRAPH_API}/me?fields=id%2Cname&access_token=${process.env.USER_ACCESS_TOKEN}`;
  // 3565706460408375/accounts
  // console.log(process.env.FACEBOOK_GRAPH_API);
  console.log(url);
  try {
    const response = await axios.get(url);
    console.log(response.data);
    const { name, userID } = response.data;
    res.status(200).json({
      message: "Found user",
      name: name,
      userID: userID,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});
app.get("/pageId", async (req, res) => {
  const url = `${process.env.FACEBOOK_GRAPH_API}/me/accounts?access_token=${process.env.USER_ACCESS_TOKEN}`;
  try {
    const response = await axios.get(url);
    const PageAccessToken = response.data.data[0].access_token;
    const PageId = response.data.data[0].id;
    res.status(200).json({
      message: "found pageId and PageAccessToken",
      PageAccessToken: PageAccessToken,
      PageId: PageId,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});
app.get("/getconversations", async (req, res) => {
  const { PageAccessToken, PageId } = req.body;
  const url = `${process.env.FACEBOOK_GRAPH_API}/${PageId}/conversations?fields=participants,messages{id,message}&access_token=${PageAccessToken}`;
  console.log(url);
  try {
    const response = await axios.get(url);
    res.status(200).json({
      message: "found conversations",
      response: response.data,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

app.get("/getconversationsfromuser", async (req, res) => {
  const { PageId, PageScopedId, PageAccessToken } = req.body;
  const url = `${process.env.FACEBOOK_GRAPH_API}/${PageId}/conversations?platform=messenger&user_id=${PageScopedId}&access_token=${PageAccessToken}`;
  console.log(url);
  try {
    const response = await axios.get(url);
    console.log(response.data);
    const conversationId = response.data.data[0].id;
    console.log(conversationId);
    res
      .status(200)
      .json({ message: "conversation found", conversationId: conversationId });
  } catch (error) {
    console.log(error.message);
    res.send("error in fetching conversation");
  }
});
app.get("/getconversationById", async (req, res) => {
  const { conversationId } = req.body;
  const url = `${process.env.FACEBOOK_GRAPH_API}/${conversationId}?fields=messages{id,message,from,to}&access_token=${process.env.PAGE_ACCESS_TOKEN}`;
  try {
    const response = await axios.get(url);
    console.log(response.data);
    const Messagesdata = response.data.messages.data;
    res
      .status(200)
      .json({ message: "conversations found", data: Messagesdata });
  } catch (err) {
    console.log("err");
    res.status(400).json({ message: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("<html><body><h1>Basic HTML</h1></body></html>");
});

app.post("/send-message", async (req, res) => {
  const { message, PageScopedId, PageAccessToken, PageId } = req.body;
  const url = `${process.env.FACEBOOK_GRAPH_API}/${PageId}/messages?recipient={id:${PageScopedId}}&message={text:"${message}"}&messaging_type=RESPONSE&access_token=${PageAccessToken}`;
  console.log(url);

  try {
    const response = await axios.post(url);
    console.log(response.data);

    // Save the relevant data to MongoDB
    const {  recipient_id , message_id } = response.data;
    const newMessage = new Message({
      senderId: PageScopedId,
      recipientId: recipient_id,
      timestamp: new Date(timestamp), // Convert to Date object
      messageId: message_id,
      messageText: message,
    });

    await newMessage.save();
    
    res.status(200).json({ message: "message sent" });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ message: err.message });
  }
});
// Listening for incoming requests on the specified port
server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
