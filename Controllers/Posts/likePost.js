
const Post = require('../../Schema/Post')

const likePost = async(req,res)=>{
console.log(req.body)
try {
    let result = await Post.findByIdAndUpdate(req.body.postId, {$push: {likes: req.body.userId}}, {new: true})
res.json(result)
} catch (error) {
res.json(error)
}

}
const unlike = async (req, res) => {
  try{
    let result = await Post.findByIdAndUpdate(req.body.postId, {$pull: {likes: req.body.userId}}, {new: true})
    res.json(result)
  }catch(err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

module.exports={likePost,unlike}