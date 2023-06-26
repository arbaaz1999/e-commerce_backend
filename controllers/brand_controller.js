const Brand = require('../models/brand_model');
const async_handler = require('express-async-handler');


const add_brand = async_handler(async (req, res) => {
    try {
        const { brand_name } = req.body;
        const check = await Brand.findOne({ brand_name: { "$regex": brand_name, "$options": "i" } });
        if (check) {
            return res.status(403).json({
                message: `brand ${check.brand_name} is already exist`
            })
        }
        if (brand_name) {
            const new_brand = await Brand.create({ brand_name })
            return res.status(200).json({
                message: `${new_brand.brand_name} brand created successfully`,
                data: new_brand,
                error: null
            })
        } else {
            return res.status(403).json({
                message: `Can not create ${brand_name} brand!`
            })
        }
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
        })
    }
})

const get_all_brands = async_handler(async (req, res) => {
    try {
        const all_brands = await Brand.find({})
        if (all_brands.length > 0) {
            return res.status(200).json({
                message: 'Brands fetched successfully',
                data: all_brands,
                error: null
            })
        } else {
            return res.status(404).json({
                message: "Not Found!"
            })
        }
    } catch (error) {
        return res.status(500).json({
            msg: "Internal server error!",
            error: error.message
        })
    }
})

module.exports = { add_brand, get_all_brands }