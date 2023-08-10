const express = require('express');
const cors = require("cors")
const {connection} = require("./config/db")
const {userRouter} = require("./route/user.route")
const {authenticate}=require("./middlewares/authenticate.middleware")
const {eventRouter} = require("./route/event.route")
require("dotenv").config()

const app = express()
app.use(cors())
app.use(express.json())

app.get("/",(req,res) =>{
    res.send("HOME PAGE")
})

app.use("/api",userRouter);
app.use(authenticate);
app.use("/events",eventRouter)

app.listen(process.env.port, async()=>{
    try{
        await connection;
        console.log("Connected to DB");
    }
    catch(err){
        console.log("Error connecting to DB:", err);
    }
    console.log(`Server running on ${process.env.port}`);
})
