const express=require('express');
const {handleGenerateShortId,handleRedirectToId, handleGetAnalytics}=require('../controllers/url');
const router=express.Router();

router.post("/",handleGenerateShortId);
router.get("/:shortId",handleRedirectToId);
router.get("/analytics/:shortId",handleGetAnalytics);


module.exports=router;