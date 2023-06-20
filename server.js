const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');


connectDB();
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', async (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, (err)=> {
    if(err) console.log(err)
    else console.log('App is successfully running on port : ', PORT)
})