const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();


url="mongodb+srv://ahmed:ahmed12345@cluster0.cgzzj.mongodb.net/heelo?retryWrites=true&w=majority";


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