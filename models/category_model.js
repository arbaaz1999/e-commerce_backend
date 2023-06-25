const mongoose = require('mongoose')

const category_schema = mongoose.Schema({
    category_name: {
        type: String,
        required: true,
        unique: true,
    }
}, { timestamps: true })

const Category = mongoose.model('Category', category_schema);

const sub_category_schema = mongoose.Schema({
    sub_category_name: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
}, { timestamps: true })

const Sub_Category = mongoose.model('Sub_Category', sub_category_schema);

module.exports = { Category, Sub_Category };