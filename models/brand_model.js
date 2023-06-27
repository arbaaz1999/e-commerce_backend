const mongoose = require('mongoose');

const brand_schema = mongoose.Schema({
    brand_name: {
        type: String,
        required: true
    },
    category: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Category',
    }
}, { timestamps: true })

module.exports = mongoose.model('Brand', brand_schema);