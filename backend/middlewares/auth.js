const jwt = require('jsonwebtoken');
const Register = require('../src/models/Register');

const auth = async function (req, res, next) {
    try {
        const { token } = req.cookies;
        console.log(token+"hello");
        if (token) {
            const userVerify = await jwt.verify(token, process.env.SECRET_KEY);
            const user = await Register.findOne({ _id: userVerify._id });
            req.user = user;
            console.log('authentication successfull');
            next();
        }
        else {
            throw new Error();
        }
    }
    catch (err) {
        res.status(401).json({ error: "Unauthorized access" });
    }
}

module.exports = auth;