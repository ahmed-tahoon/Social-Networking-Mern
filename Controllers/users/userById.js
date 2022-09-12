const { use } = require("passport");
const User = require("../../Schema/User");


const userById =async(req,res,next,id)=>
{
 
 try {      
  let user =await User.findById(id).populate('following' , '_id name image')
  .populate('followers','_id name image')
  .exec()

  if(!user)
  {
      return res.status('400').json({
        error: "User not found"
      })
  }
  req.profile=user
  next();

    } catch (err) {
        return res.status('400').json({
      error: "Could not retrieve user"
    })
    }
}

module.exports=userById