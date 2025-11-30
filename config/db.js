const mongoose=require("mongoose");

exports.connectToMongoDB = (url) =>{
    return mongoose.connect(url)
    .then(()=>console.log("DB Connected"))
    .catch(err => console.log("DB error:",err));
}