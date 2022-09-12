const User = require('../../Schema/User')

const removeFollowing = async(req,res,next)=>{
    try {   
    await User.findByIdAndUpdate(req.body.userId ,{$pull:{following : req.body.unfollowId}})
          next();
    } catch (error) {
        return res.status(400).json({
      error: errorHandler.getErrorMessage(error)
         })
    }
}

module.exports = removeFollowing
