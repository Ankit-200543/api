const express=require('express')
const app=express()
const port=3000 || process.env.PORT;


app.get("/",(req,res)=>{
    res.send("Hello fello Users")
})

app.listen(port,()=>{
    console.log("server Is started")
})