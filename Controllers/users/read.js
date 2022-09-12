const User = require("../../Schema/User");


const read = (req,res,next)=>{

     
    res.json(req.profile)

}

module.exports=read