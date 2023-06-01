//defining the user schema
const mongoose=require("mongoose");
const userschema=new mongoose.Schema({
    id:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    hobbies:{
        type:[String],
        required:true
    }

},{collection:"dating_app"})
const User = mongoose.model('User', userschema);

module.exports = User;