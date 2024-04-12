const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/nutri_plan_pro';

mongoose.connect(uri).then(()=>{
    console.log("connection successfull!");
}).catch((err)=>{
    console.log("connection failed!");
});