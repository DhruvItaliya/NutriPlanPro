const { validationResult } = require('express-validator');
const Register = require('../src/models/Register');
const DietHistory = require('../src/models/DietHistoty')
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

const userRegister = async (req, res) => {
    // getting error through validationResult from req object
    const error = validationResult(req);
    if (!error.isEmpty()) {
        const errorMessage = error.array().map(error => error.msg).join('\n');
        return res.status(400).json({ success: false, error: errorMessage })
    }

    const { name, email, age, height, weight, gender, occupation, password } = req.body;
    console.log(occupation);
    // checking user is already exist or not 
    let user = await Register.findOne({ email });

    try {
        if (user) {
            return res.status(400).json({ error: "User with this email already exist" });
        }

        const registerUser = await Register({
            name,
            email,
            age,
            height,
            weight,
            gender,
            occupation,
            password
        });

        await registerUser.save();
        console.log("Registered Successfully")
        res.status(201).json({ success: true });
    }
    catch (err) {
        console.log(err.message);

        // throwing error with status code 500 (Internal Server Error)
        res.status(500).json({ error: err.message });
    }
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'codewithdhruv333@gmail.com',
            pass: process.env.PASS_KEY
        }
    });
    const mailOptions = {
        from: 'codewithdhruv333@gmail.com',
        to: email,
        subject: 'Welcome to NutriPlanPro!',
        html: `<!DOCTYPE html>
        <html lang="en">
        
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: 'Arial', sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f5f5f5;
            }
        
            .welcome-container {
              max-width: 600px;
              margin: 20px auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 10px;
              box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
            }
        
            h1 {
              color: #164043;
              font-size: 1.5rem;
              margin-bottom: 10px;
            }
        
            p {
              color: #555;
              line-height: 1.6;
              margin-bottom: 15px;
            }
        
            .thank-you {
              color: #333;
              font-weight: bold;
            }
        
            .signature {
              color: #777;
            }
          </style>
        </head>
        
        <body>
          <div class="welcome-container">
            <h1>Welcome to NutriPlanPro, ${name}!</h1>
            <p>Welcome to NutriPlanPro!</p>
            <p>We are thrilled to welcome you aboard as a member of our platform dedicated to promoting healthy living through personalized diet recommendations. Your decision to join us marks the beginning of a journey towards achieving your health and wellness goals.</p>
            <p>At NutriPlanPro, we understand that each individual has unique dietary needs and preferences. Our mission is to empower you with personalized diet plans tailored to your specific requirements, whether it's weight management, improving overall health, or addressing specific nutritional deficiencies.</p>
            <p class="thank-you">Thank you for entrusting us with your health journey. Together, we can cultivate healthy habits, nourish our bodies, and embark on a path towards lifelong well-being.</p>
            <p class="signature">Best regards,<br>The NutriPlanPro Team</p>
          </div>
        </body>
        
        </html>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            throw Error('Failed to send mail');
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}


const userLogin = async (req, res) => {
    // getting error through validationResult from req object
    const error = validationResult(req);
    if (!error.isEmpty()) {
        const errorMessage = error.array().map(error => error.msg).join('\n');
        return res.status(400).json({ error: errorMessage })
    }

    try {
        // destructuring req.body
        const { email, password } = req.body;
        const userData = await Register.findOne({ email }).select("+password");
        if (userData) {
            if (await bcrypt.compare(password, userData.password)) {
                const token = await userData.generateToken();
                const maxAge = 3600 * 1000;
                const options = {
                    httpOnly: true,
                    maxAge: maxAge
                }
                res.status(201).cookie('token', token, options).json({ success: true, userData: userData, auth_token: token });
            }
            else {
                throw new Error('Invalid User Credentials');
            }
        }
        else {
            throw new Error('Invalid User Credentials');
        }
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, error: err.message });
    }
}

const editProfile = async (req, res) => {
    // getting error through validationResult from req object
    const error = validationResult(req);
    if (!error.isEmpty()) {
        const errorMessage = error.array().map(error => error.msg).join('\n');
        return res.status(400).json({ success: false, error: errorMessage })
    }

    const { name, age, height, weight, gender, occupation } = req.body;
    console.log(occupation);
    const userId = req.user._id

    // checking user is already exist or not 
    let user = await Register.findById(userId);

    try {
        if (!user) {
            return res.status(400).json({ error: "User not registered!" });
        }

        const updatedProfile = await Register.findByIdAndUpdate(userId, {
            name,
            age,
            height,
            weight,
            gender,
            occupation,
        }, { new: true });
        console.log("Updated Successfully")
        res.status(201).json({ success: true,userData:updatedProfile });
    }
    catch (err) {
        console.log(err.message);

        // throwing error with status code 500 (Internal Server Error)
        res.status(500).json({ error: err.message });
    }
}

const saveDiet = async (req, res) => {
    const { personalData, selectedMeals } = req.body;

    try {
        const history = await DietHistory({
            userId: req.user._id,
            personalData,
            selectedMeals
        });

        await history.save();
        console.log("Recommendation saved Successfully!")
        res.status(201).json({ success: true });
    }
    catch (err) {
        console.log(err.message);

        // throwing error with status code 500 (Internal Server Error)
        res.status(500).json({ error: err.message });
    }
}

const getHistory = async (req, res) => {
    try {
        const history = await DietHistory.find({ userId: req.user._id });
        res.status(201).json({ success: true, history });
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}

const userLogout = (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(Date.now())
    })
    console.log("Logout successfully")
    res.status(201).json({ success: true });
}

module.exports = { userLogin, userRegister, userLogout, editProfile, saveDiet, getHistory };