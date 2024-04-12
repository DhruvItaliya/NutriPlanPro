const mongoose = require('mongoose');

const contactUsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    subject:{
        type:String,
        required:true,
    },
    country:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true,
    }
},{timestamps:true});

// we are creating model named Register based on userSchema and stored model in Register variable
const ContactUs = new mongoose.model("ContactUs",contactUsSchema);
module.exports = ContactUs;