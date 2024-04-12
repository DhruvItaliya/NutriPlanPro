const mongoose = require('mongoose');

const answerSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Register'
    },
    answer:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

const communitySchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Register'
    },
    question:{
        type:String,
        unique:true,
        required:true,
    },
    tags:{
        type:[String]
    },
    answers:{
        type:[answerSchema]
    },
},{timestamps:true})

const Community = mongoose.model("community",communitySchema);
module.exports = Community;