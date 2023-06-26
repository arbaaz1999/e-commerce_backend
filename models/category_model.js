const mongoose = require('mongoose')

const category_schema = mongoose.Schema({
    category_name: {
        type: String,
        required: true,
        unique: true,
    }
}, { timestamps: true })

const Category = mongoose.model('Category', category_schema);

module.exports = Category;