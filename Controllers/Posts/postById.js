const Post = require("../../Schema/Post");



const postByID = async (req, res, next, id) => {
  try{
    let post = await Post.findById(id).populate('author', '_id name').exec()
    if (!post)
      return res.status('400').json({
        error: "Post not found"
      })
    req.post = post
    next()
  }catch(err){
    return res.status('400').json({
      error: "Could not retrieve use post"
    })
  }
}


module.exports=postByID