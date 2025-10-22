const express=require('express')
const app=express()
const port=3000 || process.env.PORT;


app.get("/",(req,res)=>{
    res.send("welcome to my webpage")
})

app.listen(port,()=>{
    console.log("server Is started")
})