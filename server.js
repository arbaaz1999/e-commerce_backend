const express = require('express');
const app = express();
const PORT = process.env.PORT || 443;

app.get('/', async (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, function(err) {
    if(err){
        console.log(err)
    }
    else {
        console.log('App is running on ', PORT)
    }
})