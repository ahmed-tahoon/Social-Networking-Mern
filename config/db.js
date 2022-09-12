const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();


url=process.env.MONGO_URI;


mongoose.connect(url , (err)=>{
if (err)
{
    console.log(err)
}
else
{
    console.log("connected Success")
}

} )