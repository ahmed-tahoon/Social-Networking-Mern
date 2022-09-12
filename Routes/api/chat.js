const express = require("express");
const router = express.Router();
const auth =require("../../middleware/auth")
const accessChat = require ("../../Controllers/chat/accessChat")
const fetchChats = require("../../Controllers/chat/fetchChat")
router.route("/").post(accessChat);
router.route("/").get(auth,fetchChats);


module.exports=router