const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app); // Create HTTP server
const io = new Server(server); // Attach Socket.IO to server

const port = process.env.PORT || 3000;
let RequestNo = 0;

// Normal HTTP route
app.get("/", (req, res) => {
  RequestNo++;
  console.log("This is Request No " + RequestNo);
  res.send("Hello fellow Users! You are number " + RequestNo);
});

// Socket.IO part
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("chat message", (msg) => {
    console.log("Message:", msg);
    io.emit("chat message", msg); // Broadcast to everyone
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
