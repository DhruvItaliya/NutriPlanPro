const express = require('express');
const router = express.Router();
const {contactUs} = require('../../controllers/woLoginController');

//Destructuring body and validationResult
const {body} = require('express-validator');

router.post('/contact_us',[
    //Validation using express-validator
    body('name',"Enter valid name!").isLength({min:3}),
    body('email',"Enter valid email address!").isEmail(),
    body('subject',"Enter valid subject!").isLength({min:3}),
    body('message',"message should contain atleast 15 character!").isLength({min:15}),
],contactUs);

// It is necessary to export module
module.exports = router;