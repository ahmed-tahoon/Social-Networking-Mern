
const User = require("../../Schema/User");

const check =async (req,res,next)=>{


    let user = req.profile

     if(req.body.email&&req.body.email!=user.email){
     if(user.email!=req.body.email)
     {
    await User.findOne({ email: req.body.email }).then(user1 => {
    if (user1) {
      return res.json({ error : "Email already exists" });
    }
    else
    next()
    })
    }}
    else
    {
        next()
    }

}

module.exports=check