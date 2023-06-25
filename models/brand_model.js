const mongoose = require('mongoose');

const brand_schema = mongoose.Schema({
    brand_name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Brand', brand_schema);