const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const user_router = require('./routes/user_route');
const category_route = require('./routes/category_route');
const brand_route = require('./routes/brand_route');
const sub_category_route = require('./routes/sub_category_route')
const error_handler = require('./middlewares/error_handler');


connectDB();
dotenv.config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.get('/', async (req, res) => {
    res.send('Hello World!')
});

app.use('/v1/api/users', user_router);
app.use('/v1/api/categories', category_route);
app.use('/v1/api/sub_categories', sub_category_route);
app.use('/v1/api/brands', brand_route);


app.use(error_handler)

app.listen(PORT, (err) => {
    if (err) console.log(err)
    else console.log('App is successfully running on port : ', PORT)
})