
const User = require('../../Schema/User')

const addFollower =async(req,res,next)=>{

    try {
    let r  = await User.findByIdAndUpdate(req.body.followId , {$push : {followers : req.body.userId}})
    .populate('following','_id name')
    .populate('followers' , '_id name')
    .exec();
         
    res.json(r);
    next();
    } catch (error) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })        
    }





}

module.exports = addFollower
