require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
require('./db/conn');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT;

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());

app.get('/',(req,res)=>{
    res.status(201).send("Welcome to Home page");
});

app.use('/',require('./routes/woLogin'))
app.use('/auth',require('./routes/auth'))

console.log(PORT);
app.listen(PORT,()=>{
    console.log(`listening to port ${PORT}`);
})