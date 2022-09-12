
const User = require('../../Schema/User')

const removeFollower =async(req,res,next)=>{


    console.log(req.body);

    try {
    let r  = await User.findByIdAndUpdate(req.body.unfollowId , {$pull : {followers : req.body.userId}})
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

module.exports = removeFollower
