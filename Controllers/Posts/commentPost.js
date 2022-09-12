
const Post = require('../../Schema/Post')

const commentPost = async (req,res)=>{

let comment = req.body.comment
comment.commentedBy = req.body.userId

console.log(comment)


try {
    let result = await Post.findByIdAndUpdate(req.body.postId, {$push: {comments: comment}}, {new: true})
     .populate('comments.commentedBy', '_id name image')
     .populate('author', '_id name')
     .exec()
    res.json(result)
  }catch(err){
   console.log(err)
  }

}


module.exports=commentPost