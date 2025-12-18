const express=require('express');
const URL=require("./models/url");
const path=require("path"); 
const PORT=8001;
const {connectToMongoDB} =require("./connect");
const cookieParser=require('cookie-parser');
const {restrictToLoggedinUserOnly, checkAuth}=require('./middlewares/auth')

//Routes
const urlRoute=require("./routes/url");
const staticRoute=require('./routes/staticRouter');
const userRoute=require('./routes/user');

//starts express server
const app=express();


connectToMongoDB("mongodb://localhost:27017/new-short-url")
.then(()=>console.log("MongoDb connected"))
.catch((err)=>console.log(err));

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false})); //to parse form data
app.use(cookieParser());


//View Engine-Tool used in backend frameworks to generate HTML dynamically on the server before sending it to the browser.
app.set("view engine","ejs");
app.set('views',path.resolve("./views")); //all ejs files are in views



app.get("/test",async(req,res)=>{
    const allUrls=await URL.find({});
    return res.render('home',{
        urls:allUrls,   //can pass as many data as we want
    });
});

app.use("/url",restrictToLoggedinUserOnly,urlRoute); //send to routes 
app.use("/user",userRoute); 
app.use("/",checkAuth,staticRoute);


app.listen(PORT,()=>console.log(`Server started at PORT: ${PORT}`));