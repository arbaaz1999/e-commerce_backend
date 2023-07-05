const { S3Client } = require('@aws-sdk/client-s3')
const multer = require('multer');
const multer_s3 = require('multer-s3');
require('dotenv').config();
const async_handler = require('express-async-handler');
const Products = require('../models/product_model');
const Category = require('../models/category_model');
const Brand = require('../models/brand_model');

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
        const { product_model, product_name, category, sub_category, brand, price, quantity, product_desc, product_images } = req.body;

        const product = await Products.findOne({ product_model: product_model })
        if (product) {
            product.quantity += quantity;
            await product.save();
            return res.status(200).json({
                message: `Product with model # ${product.product_model} is already created! Product quantity updated successfully`
            })
        }

        const new_product = await Products.create({ product_model, product_name, category, sub_category, brand, price, quantity, product_desc, product_images })
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

// get all products with advance search, filter, sort and pagination

const get_all_products = async_handler(async (req, res) => {
    try {
        let page = req.query.page || 0;
        let limit = req.query.limit || 1;
        let category = req.query.category || "";
        let brand = req.query.brand || "";
        let search = req.query.search || "";
        let min_price = Number(req.query.minPrice) || 0;
        let max_price = Number(req.query.maxPrice) || 999999;
        let sortBy = req.query.sortBy;
        let sort = {};
        if (sortBy === "price_asc") {
            sort.price = 1
        } else if (sortBy === "price_desc") {
            sort.price = -1
        } else if (sortBy === "newest") {
            sort.createdAt = -1
        } else {
            sort.product_name = -1
        }

        const all_products = await Products.find({
            $or: [
                { product_name: { "$regex": search, "$options": "i" } },
                { product_model: { "$regex": search, "$options": "i" } },
            ],
        })
            .populate("category", { "category_name": 1, "_id": 0 })
            .populate("sub_category", { "sub_category_name": 1, "_id": 0 })
            .populate("brand", { "brand_name": 1, "_id": 0 }).sort(sort).limit(limit).skip(limit * page)
        const count = all_products.length;

        if (all_products) {
            return res.status(200).json({
                message: "Products fetched successfully",
                total_products: count,
                data: all_products,
                error: null
            })
        } else if (count === 0) {
            return res.status(404).json({
                message: "No product found"
            })
        } else {
            return res.status(404).json({
                message: "Something went wrong"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
        })

    }
})

module.exports = { upload, upload_product_images, add_product, get_all_products }