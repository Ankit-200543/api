const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // allow all origins for testing
  },
});
const userd="ankit"

let RequestNo = 0;

app.get("/", (req, res) => {
  RequestNo++;
  console.log("This is Request No " + RequestNo);
  res.send("Hello fellow users! You are number " + RequestNo);
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("checkAvialableUsername", (username) => {
    if(userd!=username){
          socket.emit("Yes")
    }
    else{
                socket.emit("No")

    }
   
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
