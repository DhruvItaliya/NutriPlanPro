const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    age:{
        type:Number,
        required:true,
    },
    height:{
        type:Number,
        required:true,
    },
    weight:{
        type:Number,
        required:true,
    },
    gender:{
        type:String,
        enum:["male","female"],
        required:true,
    },
    occupation:{
        type:String,
        enum:["Dietitians and Nutritionist","Nutrition Coach","Health Educator","Fitness Trainers and Instructor","Public Health Professional","Bussiness Man","Engineer","Accountant","Lawyer","Student"],
        required:true,
    },
    password:{
        type:String,
        required:true,
        select: false
    }
},{timestamps:true});

// we are using mongodb middleware which triggered before save();
userSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,10);
    }
    next();
});

// function for generate token

userSchema.methods.generateToken = async function(){
    try{
        const token = await jwt.sign({_id:this._id},process.env.SECRET_KEY);
        return token;
    }
    catch(err){
        console.log("Error in generate token"); 
    }
} 

// we are creating model named Register based on userSchema and stored model in Register variable
const Register = new mongoose.model("Register",userSchema);
module.exports = Register;