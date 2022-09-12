const express = require("express");


const router = express.Router();
const auth =require("../../middleware/auth")
const allMessage = require ("../../Controllers/chat/allMessage")
const sendMessage = require("../../Controllers/chat/sendMessage")
router.route("/:chatId").get(allMessage);
router.route("/").post(sendMessage);


module.exports=router