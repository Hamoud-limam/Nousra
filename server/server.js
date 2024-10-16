import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import talab from "./talab.js"
import bookses from "./bookses.js"
import cors from "cors"
import videos from "./videos.js"

dotenv.config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())
const port = 3000;

const db = mongoose.connect(process.env.DBURL);
db.then(()=>{
    console.log('connected to db')
})
db.catch((error)=>{  
    console.log(error)
})

app.post("/sendTalab", async (req,res)=>{
    try{
        const {name,phone,note,bookname} = req.body;
        const talabData = new talab({name,phone,note,bookname})
        talabData.save()
        res.send("sended")
        console.log("new talab")

    }
    catch(err){
        console.log(err)
    }
})
app.get("/getBookses", async (req,res)=>{
    try{
        const books = await bookses.find({})
     res.status(200).json(books)
    }
    catch(err){
        console.log(err)
    }
})

app.get("/getvideos", async (req,res)=>{
    try{
        const video = await videos.find({})
     res.status(200).json(video)
    }
    catch(err){
        console.log(err)
    }
})

app.listen(port,()=>{
    console.log(` i am listening at port ${port}`)
})
