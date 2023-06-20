const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', async (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT)