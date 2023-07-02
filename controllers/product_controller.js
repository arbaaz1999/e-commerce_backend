const { S3Client } = require('@aws-sdk/client-s3')
const multer = require('multer');
const multer_s3 = require('multer-s3');
require('dotenv').config();
const async_handler = require('express-async-handler');
const Products = require('../models/product_model');

const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    region: process.env.S3_REGION
});

const upload = multer({
    storage: multer_s3({
        s3: s3,
        bucket: process.env.S3_BUCKET,
        key: function (req, file, cb) {
            cb(null, file.originalname + '_' + Date.now())
        },
    }),
    limits: { files: 5 },
    fileFilter: function (req, file, cb) {
        (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg')
            ? cb(null, true)
            : cb(null, false)

    },
})

const upload_product_images = async_handler(async (req, res) => {
    try {
        const images = req.files.map(file => file.location)
        if (images.length > 0) {
            return res.status(200).send(images)
        } else {
            return res.status(403).json({
                message: 'Please upload valid file type',
            })
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
})

const add_product = async_handler(async (req, res) => {
    try {
        const { model, product_name, category, sub_category, brand, price, quantity, product_desc, product_images } = req.body;

        const product = await Products.findOne({ model: model })
        if (product) {
            product.quantity += quantity;
            await product.save();
            return res.status(200).json({
                message: `Product with model # ${product.model} is already created! Product quantity updated successfully`
            })
        }

        const new_product = await Products.create({ model, product_name, category, sub_category, brand, price, quantity, product_desc, product_images })
        if (new_product) {
            return res.status(200).json({
                message: "Product added successfully",
                data: new_product,
                error: null
            })
        } else {
            return res.status(403).json({
                message: "Unable to upload the product",
                error: true
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })

    }
})



module.exports = { upload, upload_product_images, add_product }