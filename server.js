const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const user_router = require('./routes/user_route');
const error_handler = require('./middlewares/error_handler');


connectDB();
dotenv.config();
const app = express();
app.use(express.json())
const PORT = process.env.PORT || 5000;

app.get('/', async (req, res) => {
    res.send('Hello World!')
})

app.use('/v1/api/users', user_router)
app.use(error_handler)

app.listen(PORT, (err)=> {
    if(err) console.log(err)
    else console.log('App is successfully running on port : ', PORT)
})