const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const user_router = require('./routes/user_route');
const category_route = require('./routes/category_route');
const brand_route = require('./routes/brand_route');
const sub_category_route = require('./routes/sub_category_route');
const product_route = require('./routes/product_route');
const screen_size_route = require('./routes/screen_size_route');
const screen_type_route = require('./routes/screen_type_route');
const error_handler = require('./middlewares/error_handler');


connectDB();
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const PORT = process.env.PORT || 5000;

app.get('/', async (req, res) => {
    res.send('Hello World!')
});

app.use('/v1/api/users', user_router);
app.use('/v1/api/categories', category_route);
app.use('/v1/api/sub_categories', sub_category_route);
app.use('/v1/api/brands', brand_route);
app.use('/v1/api/products', product_route);
app.use('/v1/api/screen_sizes', screen_size_route);
app.use('/v1/api/screen_types', screen_type_route);

app.use(error_handler)

app.listen(PORT, (err) => {
    if (err) console.log(err)
    else console.log('App is successfully running on port : ', PORT)
})