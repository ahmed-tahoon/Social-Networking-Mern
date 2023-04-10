const Post = require("../../Schema/Post");
const User = require("../../Schema/User");
const formidable = require('formidable')


const createPost = async (req,res)=>{
    console.log(req.body);


const { Text, pic,user } = req.body;


  const NewPost = await new Post({
     
	caption:Text,
	photo:pic,
	author:user.id,	
	userDetails:{name:user.name , id:user.id}

  })

    

   try {
      let result = await NewPost.save()
      res.json(result)
    }catch (err){
      return res.status(400).json({
        err
      })
    }

  };

const getPosts = async (req,res)=>{



}

const likePost = async (req,res)=>{



}



const deletePost = async (req,res)=>{



}



const updatePost = async (req,res)=>{



}


module.exports = {
	createPost,
	getPosts,
	likePost,
	deletePost,
	updatePost,
};