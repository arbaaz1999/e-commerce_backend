const Sub_Category = require('./sub_category_model');
const mongoose = require('mongoose');

const product_schema = mongoose.Schema({
    product_model: {
        type: String,
        required: true,
    },
    product_name: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    sub_category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sub_Category',
        required: true
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
    },
    product_desc: {
        type: String,
        required: true,
    },
    product_images: {
        type: [String],
        required: true,
        validate: {
            validator: function (v) {
                return v.length > 0 && v.length < 6;
            },
            message: "You can upload upto 5 images only"
        },
        required: [true, 'Upload atleast 1 image']
    }
}, { timestamps: true });

product_schema.pre('save', async function (next) {
    if (this.sub_category) {
        try {
            const check = await Sub_Category.findOne(this.sub_category);
            if (!check || JSON.stringify(check.category) !== JSON.stringify(this.category)) {
                return 'Please check your category or sub-category';
            }
        } catch (error) {
            return error.message;
        }
    }
    next();
})

const Products = mongoose.model('Products', product_schema);

module.exports = Products;