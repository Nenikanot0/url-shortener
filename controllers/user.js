const User=require('../models/user');
const {v4:uuidv4}=require('uuid');
const { setUser }=require('../service/auth');


async function handleUserSignup(req,res) {
    try{
        const {name,email,password} =req.body; 
        await User.create({
            name,
            email,
            password,
        });
        console.log("SIGNUP HIT", req.body);
        return res.render("home",{
            id: null,     // 👈 important
            urls: []      // if home.ejs expects urls
        });
    }catch(err) {
        console.log(err);
        return res.status(500).send("Error saving user");
    }
}
async function handleUserLogin(req,res) {
    try{
        const {name,email,password} =req.body; 
        const user = await User.findOne({email,password});
        if(!user) return res.render('login',{
            error: "Invalid username or password",
        })
        const sessionId=uuidv4();
        setUser(sessionId,user);
        res.cookie("uid" , sessionId);
        return res.redirect("/");
    }catch(err) {
        console.log(err);
        return res.status(500).send("Error saving user");
    }
}

module.exports = {
    handleUserSignup,
    handleUserLogin
}