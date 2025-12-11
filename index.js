const express=require('express');
const userRouter=require("./routes/url");
const URL=require("./models/url");
const path=require("path"); 
const staticRoute=require('./routes/staticRouter');
const PORT=8001
const {connectToMongoDB} =require("./connect");

const app=express();


connectToMongoDB("mongodb://localhost:27017/new-short-url")
.then(()=>console.log("MongoDb connected"))
.catch((err)=>console.log(err));

//Middlewares
app.use(express.json());
app.use(express.urlencoded({entended:false})); //to parse form data


//View Engine-Tool used in backend frameworks to generate HTML dynamically on the server before sending it to the browser.
app.set("view engine","ejs");
app.set('views',path.resolve("./views")); //all ejs files are in views



app.get("/test",async(req,res)=>{
    const allUrls=await URL.find({});
    return res.render('home',{
        urls:allUrls,   //can pass as many data as we want
    });
});

app.use("/url",userRouter); //send to routes 
app.use("/",staticRoute);


app.listen(PORT,()=>console.log(`Server started at PORT: ${PORT}`));