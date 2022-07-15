const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    text: String,
    productID:{type:mongoose.Schema.Types.ObjectId , ref:"Product" , required:true},
    createdBy:{type:mongoose.Schema.Types.ObjectId , ref:"User" , required:true},
    replys:[{type:mongoose.Schema.Types.ObjectId , ref:"Comment" }]
}, {
    timestamps: true
})
const commentModel  = mongoose.model("Comment" , commentSchema);
module.exports = commentModel