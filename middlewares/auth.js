const {getUser}=require('../service/auth');

function checkForAuthentication(req,res,next){
    try{
        const tokenCookie=req.cookies?.token;
    req.user=null;

    if(!tokenCookie)
        return next();

    const token=tokenCookie;
    const user = getUser(token);

    req.user = user;
    return next();
    }catch{
        console.log(error);
    }
}

function restrictTo(roles){
    try{
        return function(req,res,next){
        if(!req.user)  return res.redirect("/login");

        if(!roles.includes(req.user.role)) return res.end("Unauthorized");

        return next();
    };
    }catch{
        console.log(error);
    }

    
}


module.exports={
    checkForAuthentication,
    restrictTo,
}