const express = require('express');
const router = express.Router();
const {userLogin,userRegister,editProfile,userLogout,saveDiet,getHistory} = require('../../controllers/userController');
const { getAllPost, addAnswer,addQuestion} =  require("../../controllers/communityController");
const auth = require('../../middlewares/auth');

//Destructuring body and validationResult
const {body} = require('express-validator');

router.post('/register',[
    //Validation using express-validator
    body('name',"Enter valid name!").isLength({min:3}),
    body('email',"Enter valid email address!").isEmail(),
    body('age',"Minimum age 10 required!").isInt({min:10}),
    body('height',"Minimum height 50cm required!").isInt({min:50}),
    body('weight',"Minimum weight 10kg required!").isInt({min:10}),
    body('password',"Password should contain atleast 8 char with atleast one uppercase,lowercase,number and special character").isStrongPassword()
],userRegister);

router.post('/login',[
    //Validation using express-validator
    body('email',"Enter valid email address").isEmail(),
    body('password',"Invalid username or password!").isStrongPassword()
],userLogin)

router.post('/save-diet',auth,saveDiet);
router.get('/gethistory',auth,getHistory);
router.post('/editprofile',auth,editProfile);

router.get('/getuser',auth,(req,res)=>{
    try{
        console.log('Get user successfully');
        // console.log(req.user);
        // console.log(req.cookies.token);
        res.status(201).json({success:true,user:req.user});
    }
    catch(err){
        console.log(err.message)
        res.status(500).json({success:false,error:err.message});
    }
});

router.get('/logout', auth, userLogout);
router.post("/community/addQuestion",addQuestion);
router.post("/community/addAnswer",addAnswer);
router.get("/community/getAllCommunity",getAllPost)

// It is necessary to export module
module.exports = router;