const express = require("express");
const router = express.Router();
const RegisterControllers  =require('../../Controllers/auth/RegisterControllers')
const LoginControllers =require('../../Controllers/auth/LoginControllar')
const addFollower =require("../../Controllers/users/addFollower")
const addFollowing =require("../../Controllers/users/addFollowing")
const auth =require("../../middleware/auth")
const findpeaple =require("../../Controllers/users/findpeople")
const userById =require('../../Controllers/users/userById');
const read =require("../../Controllers/users/read")
const update = require('../../Controllers/users/updateUser')
const check = require('../../Controllers/auth/check')
const removeFollower =require("../../Controllers/users/removeFollowers")
const removeFollowing =require("../../Controllers/users/removeFollowing")
const allUsers =require('../../Controllers/users/allusers')

router.post('/register',RegisterControllers)
router.post('/login',LoginControllers)
router.put('/follow',addFollower,addFollowing)
router.put('/unfollow',removeFollower,removeFollowing)
router.get('/findpeople/:userId',auth,findpeaple)
router.get('/:userId',read)
router.put('/update/:userId',check,update)
router.get('/',auth,allUsers)



router.param("userId",userById)

module.exports=router