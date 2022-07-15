const mongoose = require ('mongoose');

const productSchema = new mongoose.Schema({

    title: {type:String, required:true},
    descrption: String,
    price: Number,
    createdBy:{type:mongoose.Schema.Types.ObjectId , ref:"User" , required:true},
    likes:[{type:mongoose.Schema.Types.ObjectId , ref:"User" }],
    isDeleted :{type:Boolean , default:false},
    hidden :[{type:mongoose.Schema.Types.ObjectId , ref:"User" }],
    comments:[{type:mongoose.Schema.Types.ObjectId , ref:"Comment" }],
    wishList:[{type:mongoose.Schema.Types.ObjectId , ref:"User" }]


}, {
    timestamps:true
})
const productModel  = mongoose.model("Product" , productSchema);
module.exports = productModel