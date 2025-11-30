const {nanoid}=require("nanoid");
const URL=require("../models/url");

async function handleGenerateShortId(req,res){
    const body=req.body;
    if(!body.url) return res.status(400).json({error:"url is required"});

    const shortID=nanoid(8);
    await URL.create({
        shortId:shortID,
        redirectedUrl:body.url,
        visitHistory:[],
    })

    return res.json({id:shortID});
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