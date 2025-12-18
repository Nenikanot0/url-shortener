const {nanoid}=require("nanoid");

const URL=require("../models/url");


async function handleGenerateShortId(req,res){
    const body=req.body;
    const url = body.url?.trim();


    if(!url) return res.status(400).json({error:"url is required"});


    const existing = await URL.findOne({ redirectedUrl: url });
    let shortID;
    
    if (existing) {
        shortID = existing.shortId;
    } else {
        shortID = nanoid(8);
        await URL.create({  //creates a new record
            shortId: shortID,
            redirectedUrl: url,
            visitHistory: [],
            createdBy:req.user._id,
        });
    }

    const urls = await URL.find().sort({ redirectedUrl: 1 });

    return res.render('home',{
        id:shortID,
        urls,
    });
}


async function handleRedirectToId(req,res){
    const shortId=req.params.shortId;
    const entry=await URL.findOneAndUpdate({
        shortId
    },{$push:{
        visitHistory:{
            timestamp:Date.now(),
        },
    }
}
);
res.redirect(entry.redirectedUrl);
}


async function handleGetAnalytics(req,res){
    const shortId=req.params.shortId;
    const result=await URL.findOne({shortId});

    return res.json({totalClicks:result.visitHistory.length,id:result._id,link:result.redirectedUrl,analytics:result.visitHistory});
}


module.exports={
    handleGenerateShortId,
    handleRedirectToId,
    handleGetAnalytics,

}