const express = require("express");
const router = express.Router();
const {createPost} = require('../../Controllers/Posts/Posts')
const auth =require("../../middleware/auth")
const list = require("../../Controllers/Posts/listNewsFeed")
const postById =require('../../Controllers/Posts/postById')
const userById =require('../../Controllers/users/userById')
const {likePost} = require('../../Controllers/Posts/likePost')
const {unlike} =require('../../Controllers/Posts/likePost')
const commentPost = require('../../Controllers/Posts/commentPost')
const list1 = require("../../Controllers/users/listUser")
const uncomment = require("../../Controllers/Posts/uncomment")
const remove = require("../../Controllers/Posts/remove")

router.route("/:userId").post(auth,createPost);
router.route('/feed/:userId').get(list)
router.route('/feeduser/:userId').get(list1)

router.route('/like')
  .put(auth,likePost)
router.route('/unlike')
  .put(auth, unlike)



router.route("/comment").put(auth,commentPost);
router.route("/uncomment").put(auth,uncomment);
router.route('/:postId').delete(remove)
//router.route("/:id").delete(deletePost).patch(updatePost);

router.param("userId",userById)
router.param("postId",postById)

module.exports=router