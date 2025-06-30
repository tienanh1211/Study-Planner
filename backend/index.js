require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static('uploads'));

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/studygroups', require('./routes/studygroups'));
app.use('/api/tasks', require('./routes/tasks'));
app.use('/api/upload', require('./routes/uploads'));
app.use('/api/auth', require('./routes/auth'));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // In production, you should restrict this to your frontend's URL
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('<h1>Collaborative Study Planner API</h1>');
});

io.on('connection', (socket) => {
  console.log('a user connected:', socket.id);

  socket.on('joinGroup', (groupId) => {
    socket.join(groupId);
    console.log(`User ${socket.id} joined group ${groupId}`);
  });

  socket.on('sendMessage', ({ groupId, message, user }) => {
    // We are sending the message to everyone in the room, including the sender
    io.to(groupId).emit('receiveMessage', { message, user });
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 