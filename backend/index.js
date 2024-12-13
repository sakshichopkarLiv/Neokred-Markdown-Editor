// server.js
var app = require('express')();
var http = require('http').createServer(app);
const PORT = 1080;
// var io = require('socket.io')(http);
const cors = require('cors');

// Middleware
app.use(cors());

http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});

const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('new client connected');

  // Handle incoming message from client
  socket.on('message', (message) => {
    console.log(`Received message: ${message}`);
    // Send the same message back to the client
    socket.emit('message', message);
  });
});
