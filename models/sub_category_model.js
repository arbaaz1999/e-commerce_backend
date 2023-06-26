const mongoose = require("mongoose");


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