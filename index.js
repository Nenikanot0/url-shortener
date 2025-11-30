const express=require('express');
const userRouter=require("./routes/url");

const PORT=8001
const {connectToMongoDB} =require("./connect");

const app=express();


connectToMongoDB("mongodb://localhost:27017/new-short-url")
.then(()=>console.log("MongoDb connected"))
.catch((err)=>console.log(err));

app.use(express.json());
app.use("/url",userRouter); //send to routes 
app.use(express.json());


app.listen(PORT,()=>console.log(`Server started at PORT: ${PORT}`));