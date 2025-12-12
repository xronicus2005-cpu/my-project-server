require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connect = require('./config/db');

const Message = require("./modules/messages")
const Conversation = require("./modules/conversations")


const http = require('http')
const {Server} = require('socket.io')

connect();

const app = express();
const PORT = process.env.PORT || 5000;

// Routes
const checkEmail = require('./routes/checkingEmail');
const createUser = require('./routes/createUser');
const auth = require('./routes/auth');
const userRoutes = require('./routes/userRoutes');
const defRoute = require('./routes/defaultRoutes');
const chatRoutes = require("./routes/chatRoutes")
const uploadRoute = require("./routes/upload")


// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());

// API routes
app.use("/api", checkEmail);
app.use("/api", createUser);
app.use("/api", auth);
app.use("/api", userRoutes);
app.use("/api", defRoute);
app.use("/api", chatRoutes)
app.use("/api", uploadRoute)
//app.listen(PORT, () => {console.log("Server is running")})

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true
  }
})

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("joinConversation", (conversationId) => {
    socket.join(conversationId);
    console.log(`User joined room: ${conversationId}`);
  });



  socket.on("sendMessage", async(data) => {
    const message = new Message(data);
    await message.save();

    await Conversation.findByIdAndUpdate(data.conversationId, {$inc: {unreadCount: 1}})

    io.to(data.conversationId).emit("receiveMessage", message);
  });
});

server.listen(PORT, () => {
  console.log(`server ${PORT} - da islep atir`)
})