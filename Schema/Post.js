const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
   {
      caption: {
         type: String,
      },
      photo:{
          type: "String"
         },
      publicID: {
            type: String,
         },
      created: {
      type: Date,
      default: Date.now
      },
      new:{
         type :Boolean,
         default:false
      },
      author:{
         type:mongoose.Types.ObjectId,
         ref : 'users'
      },
      userDetails: {
         name: {
            type: String,
         },
         image: {
            type: String,
         },
         id:{
           type:mongoose.Types.ObjectId,
         },
      },
      likes: {
         type: [String],
      },
      comments: [
         {
            commentedBy: {
               type:mongoose.Types.ObjectId,
               ref: "users",
            },
            text: {
               type: String,
               required: true,
            },
            commentedAt: {
               type: Date,
               default: new Date(),
               required: true,
            },
            like:{
            type: [String],
            }
         },
      ],
   },
   { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
