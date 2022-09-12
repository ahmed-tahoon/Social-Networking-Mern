const Post = require('../../Schema/Post')



const list = async (req, res) => {
  let following = req.profile.following
  following.push(req.profile._id)

  try {
      let posts = await Post.find({author: { $in : req.profile.following } })
                          .populate('author', '_id name image')
                          .populate('comments.commentedBy', '_id name image')
                          .sort('-created')
                          .exec()
                          res.json(posts)
  } catch (error) {
     return res.status(400).json({
      error: error
    })
  }
    
}

module.exports =list