const User = require('../../Schema/User')

const addFollowing = async(req,res,next)=>{
    try {   
    await User.findByIdAndUpdate(req.body.userId ,{$push:{following : req.body.followId}})
          next();
    } catch (error) {
        return res.status(400).json({
      error: errorHandler.getErrorMessage(error)
         })
    }


}

module.exports = addFollowing
