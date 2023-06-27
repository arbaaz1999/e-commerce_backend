const Sub_Category = require('../models/sub_category_model');
const async_handler = require('express-async-handler')

const add_sub_category = async_handler(async (req, res) => {
    try {
        const { sub_category_name, category } = req.body;
        const check = await Sub_Category.findOne({ sub_category_name: { "$regex": sub_category_name, "$options": "i" } });
        if (check) {
            return res.status(403).json({
                message: `sub_category ${check.sub_category_name} is already exist`
            })
        }
        if (sub_category_name) {
            const new_sub_category = await Sub_Category.create({ sub_category_name, category })
            return res.status(200).json({
                message: `${new_sub_category.sub_category_name} sub_category created successfully`,
                data: new_sub_category,
                error: null
            })
        } else {
            return res.status(403).json({
                message: `Can not create ${sub_category_name} sub_category!`
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


const get_all_sub_categories = async_handler(async (req, res) => {
    try {
        const all_sub_categories = await Sub_Category.find({}).sort({ "sub_category_name": 1 }).populate('category', "_id category_name")
        if (all_sub_categories.length > 0) {
            return res.status(200).json({
                message: 'Categories fetched successfully',
                data: all_sub_categories,
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



module.exports = { add_sub_category, get_all_sub_categories };
