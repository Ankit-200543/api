const express=require('express')
const app=express()
const port=3000 || process.env.PORT;
let RequestNo=0;


app.get("/",(req,res)=>{
    RequestNo++
    console.log("This Is Request No"+RequestNo);
    res.send("Hello fello Users ! You are Number "+RequestNo)
})
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("chat message", (msg) => {
    console.log("Message:", msg);
    io.emit("chat message", msg);
  });
});

app.listen(port,()=>{
    console.log("server Is started")
})