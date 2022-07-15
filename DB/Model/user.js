
const mongoose = require ('mongoose')
const bycrypt = require('bcryptjs')


const userSchema = new mongoose.Schema ({

    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email:{type:String, required: true, unique: true},
    password:{type:String, required: true},
    profilePic: Array,
    coverPic: Array,
    isBlocked: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    confirmEmail:{type:Boolean, default: false},
    qrCode:String,
    role:{type:String, enum: ['User', 'Admin'], default: 'User'},
    wishList:[{type:mongoose.Schema.Types.ObjectId , ref:"Product" }],
    products:[{type:mongoose.Schema.Types.ObjectId , ref:"Product" }],
    code: String,
    socketID: String
    

}, {timestamps: true})

userSchema.pre ('save', async function(next){

    this.password = await bycrypt.hash (this.password , parseInt (process.env.saltRound))
    next()
})

userSchema.pre ('findOneAndUpdate', async function(){

    const hookData = await this.model.findOne (this.getQuery()).select("__v")
    this.set({__v : hookData.__v +1});
})
const userModel = mongoose.model ('User', userSchema)


module.exports = userModel

