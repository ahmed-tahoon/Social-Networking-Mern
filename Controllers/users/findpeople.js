const User = require('../../Schema/User')


const findpeople = async(req,res)=>{

let following = req.profile.following
console.log(following)
following.push(req.profile._id)
try {    
    let users =  await User.find({_id : {$nin : following}}).select('name')
    res.json(users)
} catch (error) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
}
  
   


}

module.exports = findpeople