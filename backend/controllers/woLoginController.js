const { validationResult } = require('express-validator');
const ContactUs = require('../src/models/ContactUs');
const nodemailer = require('nodemailer')

const contactUs = async (req, res) => {
    // getting error through validationResult from req object
    const error = validationResult(req);
    if (!error.isEmpty()) {
        const errorMessage = error.array().map(error => error.msg).join('\n');
        return res.status(400).json({ success: false, error: errorMessage })
    }

    const { name, email, subject, country, message } = req.body;

    try {
        const query_feedback = await ContactUs({
            name, email, subject, country, message
        });

        await query_feedback.save();
        console.log("Sended Successfully")
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
        to: 'italiyadhruv09@gmail.com',
        subject: 'Welcome to NutriPlanPro!',
        html: `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Contact Us - NutriPlanPro</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              margin: 0;
              padding: 0;
            }
            .contact-container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f8f8f8;
              border-radius: 10px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
              color:#164043
              font-size: 24px;
              margin-bottom: 20px;
            }
            p {
              margin-bottom: 10px;
            }
            ul {
              padding-left: 20px;
            }
            li {
              margin-bottom: 5px;
            }
            .signature {
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="contact-container">
            <h1>Subject - ${subject}</h1>
            <p>Dear NutriPlanPro Team,</p>
            <p>I am reaching out to you regarding:</p>
            <p>${message}</p>
            <p>Please find my contact details below:</p>
            <ul>
              <li>Name: ${name}</li>
              <li>Email: ${email}</li>
              <li>Country: ${country}</li>
            </ul>
            <p>I look forward to hearing from you soon.</p>
            <p class="signature">Best regards,<br>${name}</p>
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

module.exports = { contactUs };
