const Post = require("../../Schema/Post");



const uncomment = async (req, res) => {
  let comment = req.body.comment
  try{
    let result = await Post.findByIdAndUpdate(req.body.postId, {$pull: {comments: {_id: comment._id}}}, {new: true})
                          .populate('comments.commentedBy', '_id name image' )
                          .populate('author', '_id name')
                          .exec()
  res.json(result)
  }catch(err){
       console.log(err)
  }
}

module.exports=uncomment